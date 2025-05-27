package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"time"

	"github.com/lib/pq"

	"github.com/google/go-containerregistry/pkg/authn"
	"github.com/google/go-containerregistry/pkg/name"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/google/go-containerregistry/pkg/v1/remote"
)

const MetadataLabel = "io.buildpacks.buildpackage.metadata"

//go:generate mockery --all --output=../../internal/mocks --case=underscore
type ImageFunction func(name.Reference, ...remote.Option) (v1.Image, error)

type Entry struct {
	Namespace string `json:"ns"`
	Name      string `json:"name"`
	Version   string `json:"version"`
	Address   string `json:"addr"`
}

type Metadata struct {
	ID          string
	Version     string
	Homepage    string
	Description string
	Licenses    []license
	Stacks      []stack
}

type license struct {
	Type string
	URL  string
}

type stack struct {
	ID string
}

type IndexRecord struct {
	entry    Entry
	metadata Metadata
	err      error
}

func main() {
	if len(os.Args) != 2 {
		fmt.Println("at=index_buildpack level=error msg='invalid inputs: expected entry json'")
		os.Exit(1)
	}

	data, err := ioutil.ReadFile(os.Args[1])
	if err != nil {
		fmt.Printf("at=index_buildpack level=error msg='invalid inputs: unable to read file' file='%s' reason='%s'\n", os.Args[1], err)
		os.Exit(1)
	}

	var entries []Entry
	if err := json.Unmarshal(data, &entries); err != nil {
		fmt.Printf("at=index_buildpack level=error msg='invalid inputs: unable to parse entry json' reason='%s'\n", err)
		os.Exit(1)
	}

	numOfEntries := len(entries)
	start := 0
	sliceSize := 100
	for start+sliceSize < numOfEntries {
		buildIndex(entries[start : start+sliceSize])
		fmt.Println("at=index_buildpack level=info msg='sleep(5) to avoid 429'")
		time.Sleep(5 * time.Second) // sleep to avoid 429 from registry
		start = start + sliceSize
	}
	buildIndex(entries[start:numOfEntries])
	fmt.Println("at=index_buildpack level=info msg='done updating index'")
}

func RedactString(authConfig *authn.AuthConfig, inputStr string) string {
	outputStr := inputStr // Start with the original string

	if authConfig.IdentityToken != "" {
		outputStr = strings.ReplaceAll(outputStr, authConfig.IdentityToken, "<REDACTED>")
	}
	if authConfig.RegistryToken != "" {
		outputStr = strings.ReplaceAll(outputStr, authConfig.RegistryToken, "<REDACTED>")
	}
	if authConfig.Password != "" {
		outputStr = strings.ReplaceAll(outputStr, authConfig.Password, "<REDACTED>")
	}
	if authConfig.Username != "" {
		outputStr = strings.ReplaceAll(outputStr, authConfig.Username, "<REDACTED>")
	}
	if authConfig.Auth != "" {
		outputStr = strings.ReplaceAll(outputStr, authConfig.Auth, "<REDACTED>")
	}

	return outputStr
}

func buildIndex(entries []Entry) {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Printf("at=buildIndex level=error msg='failed to connect to database' reason='%s'\n", err)
		os.Exit(1)
	}
	defer db.Close()

	ch := make(chan IndexRecord)
	for _, e := range entries {
		go handleMetadata(e, remote.Image, ch)
	}

	for range entries {
		i := <-ch
		if i.err != nil {
			fmt.Printf("at=handleMetadata level=warn msg='failed to fetch config' entry='%s/%s@%s' reason='%s'\n", i.entry.Namespace, i.entry.Name, i.entry.Version, i.err)
		} else {
			err := UpsertMetadata(db, i.entry, i.metadata)
			if err != nil {
				fmt.Printf("at=buildIndex level=warn msg='failed to update index' entry='%s/%s@%s' reason='%s'\n", i.entry.Namespace, i.entry.Name, i.entry.Version, err)
			} else {
				fmt.Printf("at=buildIndex level=info msg='updated index' entry='%s/%s@%s'\n", i.entry.Namespace, i.entry.Name, i.entry.Version)
			}
		}
	}
}

func handleMetadata(e Entry, imageFn ImageFunction, ch chan<- IndexRecord) {
	m, err := FetchBuildpackConfig(e, imageFn)
	ch <- IndexRecord{
		metadata: m,
		entry:    e,
		err:      err,
	}
}

func FetchBuildpackConfig(e Entry, imageFn ImageFunction) (Metadata, error) {
	ref, err := name.ParseReference(e.Address)
	if err != nil {
		return Metadata{}, err
	}

	authenticator, err := authn.DefaultKeychain.Resolve(ref.Context())
	if err != nil {
		return Metadata{}, errors.New(fmt.Sprintf("Cannot resolve credentials for context %s", ref.Context()))
	}
	if _, ok := ref.(name.Digest); !ok {
		return Metadata{}, errors.New(fmt.Sprintf("address is not a digest: %s", e.Address))
	}

	image, err := imageFn(ref, remote.WithAuth(authenticator))
	if err != nil {
		return Metadata{}, err
	}

	configFile, err := image.ConfigFile()
	if err != nil {
		return Metadata{}, err
	}

	raw, ok := configFile.Config.Labels[MetadataLabel]
	if !ok {
		return Metadata{}, errors.New(fmt.Sprintf("could not find metadata label for %s", e.Address))
	}

	var m Metadata
	if err := json.Unmarshal([]byte(raw), &m); err != nil {
		return Metadata{}, err
	}

	if fmt.Sprintf("%s/%s", e.Namespace, e.Name) != m.ID {
		return Metadata{}, errors.New(fmt.Sprintf("invalid ID for %s", e.Address))
	}

	if e.Version != m.Version {
		return Metadata{}, errors.New(fmt.Sprintf("invalid version for %s", e.Address))

	}

	var stacks []string
	for _, s := range m.Stacks {
		stacks = append(stacks, s.ID)
	}

	return m, nil
}

func UpsertMetadata(db *sql.DB, e Entry, m Metadata) error {
	upsert := `
INSERT INTO buildpacks (
	namespace,
	name,
	version,
	addr,
	homepage,
	description,
	licenses,
	stacks,
	version_major,
	version_minor,
	version_patch,
	created_at,
	updated_at)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, now(), now())
ON CONFLICT (namespace, name, version)
DO
	 UPDATE SET
		 addr = $4,
		 homepage = $5,
		 description = $6,
		 licenses = $7,
		 stacks = $8,
		 version_major = $9,
		 version_minor = $10,
		 version_patch = $11,
		 updated_at = now();
`
	var stacks []string
	for _, s := range m.Stacks {
		stacks = append(stacks, s.ID)
	}

	var licenses []string
	for _, l := range m.Licenses {
		licenses = append(licenses, l.Type)
	}

	version := strings.Split(m.Version, ".")
	if len(version) < 3 {
		return fmt.Errorf("invalid semver: %s", m.Version)
	}

	_, err := db.Exec(upsert,
		e.Namespace,
		e.Name,
		e.Version,
		e.Address,
		m.Homepage,
		m.Description,
		pq.Array(licenses),
		pq.Array(stacks),
		version[0],
		version[1],
		version[2],
	)
	if err != nil {
		return err
	}

	return nil
}

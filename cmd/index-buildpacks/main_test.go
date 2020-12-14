package main_test

import (
	"errors"
	"fmt"
	ib "github.com/buildpacks/registry-api/cmd/index-buildpacks"
	"github.com/buildpacks/registry-api/internal/mocks"
	v1 "github.com/google/go-containerregistry/pkg/v1"
	"github.com/sclevine/spec/report"
	"github.com/stretchr/testify/mock"
	"testing"

	"github.com/google/go-containerregistry/pkg/v1/fake"
	. "github.com/onsi/gomega"
	"github.com/sclevine/spec"
)

func TestCacher(t *testing.T) {
	spec.Run(t, "verify-metadata", func(t *testing.T, context spec.G, it spec.S) {
		var (
			Expect = NewWithT(t).Expect

			f = &mocks.ImageFunction{}
			i = &fake.FakeImage{}
		)

		it("fails if address is not a digest image reference", func() {
			entry := ib.Entry{
				Address: "test-host/test-repository:test-version",
			}

			_, err := ib.FetchBuildpackConfig(entry, f.Execute)
			Expect(err).
				To(MatchError(errors.New(fmt.Sprintf("address is not a digest: %s", entry.Address))))
		})

		context("valid address", func() {
			var (
				entry = ib.Entry{
					Namespace: "example",
					Name: "test-id",
					Version: "test-version",
					Address: "host/repository@sha256:04ba2d17480910bd340f0305d846b007148dafd64bc6fc2626870c174b7c7de7",
				}
			)
			it.Before(func() {
				f.On("Execute", mock.Anything).Return(i, nil)
			})

			it("fails if io.buildpacks.buildpackage.metadata is not on image", func() {
				i.ConfigFileReturns(&v1.ConfigFile{
					Config: v1.Config{
						Labels: map[string]string{},
					},
				}, nil)

				_, err := ib.FetchBuildpackConfig(entry, f.Execute)
				Expect(err).
					To(MatchError(errors.New(fmt.Sprintf("could not find metadata label for %s", entry.Address))))
			})

			it("fails if id does not match", func() {
				i.ConfigFileReturns(&v1.ConfigFile{
					Config: v1.Config{
						Labels: map[string]string{ib.MetadataLabel: `{ "id": "another-id", "version": "test-version" }`},
					},
				}, nil)

				_, err := ib.FetchBuildpackConfig(entry, f.Execute)
				Expect(err).
					To(MatchError(errors.New(fmt.Sprintf("invalid ID for %s", entry.Address))))
			})

			it("fails if version does not match", func() {
				i.ConfigFileReturns(&v1.ConfigFile{
					Config: v1.Config{
						Labels: map[string]string{ib.MetadataLabel: `{ "id": "example/test-id", "version": "another-version" }`},
					},
				}, nil)

				_, err := ib.FetchBuildpackConfig(entry, f.Execute)
				Expect(err).
					To(MatchError(errors.New(fmt.Sprintf("invalid version for %s", entry.Address))))
			})

			it("passes if version and id match", func() {
				i.ConfigFileReturns(&v1.ConfigFile{
					Config: v1.Config{
						Labels: map[string]string{ib.MetadataLabel: `{ "id": "example/test-id", "version": "test-version" }`},
					},
				}, nil)

				_, err := ib.FetchBuildpackConfig(entry, f.Execute)
				Expect(err).To(Succeed())
			})
		})

	}, spec.Report(report.Terminal{}))
}

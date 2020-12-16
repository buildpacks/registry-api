// +heroku goVersion go1.15

module github.com/buildpacks/registry-api

go 1.15

require (
	github.com/Microsoft/hcsshim v0.8.11 // indirect
	github.com/containerd/continuity v0.0.0-20201208142359-180525291bb7 // indirect
	github.com/golang-migrate/migrate/v4 v4.14.1
	github.com/google/go-containerregistry v0.2.1
	github.com/lib/pq v1.8.0
	github.com/onsi/gomega v1.9.0
	github.com/opencontainers/runc v0.1.1 // indirect
	github.com/sclevine/spec v1.2.0
	github.com/stretchr/testify v1.5.1
)

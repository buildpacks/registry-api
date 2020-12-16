.EXPORT_ALL_VARIABLES:

SHELL=/bin/bash -o pipefail

build:
	@go build -o bin/ ./...

test:
	@go test ./...
	@bundle exec rails test

dburl:
	@echo "postgres://localhost:5432/cnb-registry-api-dev?sslmode=disable"

psql:
	@psql -h localhost -p 5432 cnb-registry-api-dev

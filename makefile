.EXPORT_ALL_VARIABLES:

SHELL=/bin/bash -o pipefail

build:
	@go build -o bin/ ./...

test-go:
	@go test ./...

test-ruby:
	@bundle exec rails test

test: test-go test-ruby

dburl:
	@echo "postgres://localhost:5432/cnb-registry-api-dev?sslmode=disable"

psql:
	@psql -h localhost -p 5432 cnb-registry-api-dev

index:
	@DATABASE_URL="postgres://localhost:5432/cnb-registry-api-dev?sslmode=disable" yarn run index

# generate-schema:
# 	@bundle exec prmd combine --meta meta.yaml schema/schemata/ > schema/schema.json
# 	@bundle exec prmd verify schema/schema.json

# generate-api-ref:
# 	@bundle exec prmd doc schema/schema.json > schema/api-reference.md

# schema: generate-schema generate-api-ref

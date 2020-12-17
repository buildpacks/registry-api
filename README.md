# Buildpack Registry API

[![Actions Status](https://github.com/buildpacks/registry-api/workflows/ci/badge.svg)](https://github.com/buildpacks/registry-api/actions)

This repository contains an application that exposes an API for interacting with the [Buildpack Registry](https://github.com/buildpacks/rfcs/blob/main/text/0032-update-json-cnb-registry.md).

## Endpoints

### Search

Search for a buildpack by keyword(s).


```
GET /search
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **matches** | *string* | keyword(s) to search for | "java"

#### Request Example

```bash
$ curl https://registry.buildpacks.io/v1/search?matches=projectriff
```

#### Response Example

```json
[
    {
      "latest": {
        "description": "The Command Function Buildpack is a Cloud Native Buildpack V3 that provides riff Command Function Invoker to functions",
        "license": "MIT",
        "ns":"projectriff",
        "name":"command-function",
        "version": "1.4.1",
        "yanked":false,
        "addr":"gcr.io/projectriff/command-function@sha256:99f9054abb73635a9b251b61d3627a8ff86508c767f9d691c426d45e8758596f"
      },
      "versions": {
        "1.4.1": {
          "link": "https://registry.buildpacks.io/v1/buildpacks/projectriff/command-function/1.4.1"
        },
        "1.3.9": {
          "link": "https://registry.buildpacks.io/v1/buildpacks/projectriff/command-function/1.3.9"
        }
      }
    }
]
```

## Development

This project requires [Ruby](http://www.ruby-lang.org/en/) and [Golang](https://golang.org/) tooling.

Run the tests:

```
$ make unit
```

This app uses [PostgreSQL](https://www.postgresql.org/). To set up the database, run:

```
$ bundle exec rake db:create
$ bundle exec rake db:migrate
```

Then run the app:

```
$ bundle exec rails s
```

In other terminal session, run the background worker to create the index:

```
$ make index
```

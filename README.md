# Buildpack Registry API

![CI](https://github.com/buildpacks/registry-api/workflows/CI/badge.svg)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/4748/badge)](https://bestpractices.coreinfrastructure.org/projects/4748)

This repository contains an application that exposes an API for interacting with the [Buildpack Registry](https://github.com/buildpacks/rfcs/blob/main/text/0032-update-json-cnb-registry.md).

## Endpoints

- [Search](#search)
- [Buildpack Version List](#buildpack-version-list)
- [Buildpack Version Info](#buildpack-version-info)

### Search

Search for a buildpack by keyword(s).

```
GET /search
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **matches** | *string* | keyword(s) to search for | `"projectriff"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/search?matches=projectriff"
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
          "link": "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function/1.4.1"
        },
        "1.3.9": {
          "link": "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function/1.3.9"
        }
      }
    }
]
```

### Buildpack Version List

Search for a buildpack by keyword(s).

```
GET /buildpacks/:namespace/:name
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **namespace** | *string* | the namespace component from the ID of the buildpack | `"projectriff"`
| **name** | *string* | the name component from the ID of the buildpack | `"command-function"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function"
```

#### Response Example

```json
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
      "link": "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function/1.4.1"
    },
    "1.3.9": {
      "link": "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function/1.3.9"
    }
  }
}
```

### Buildpack Version Info

Search for a buildpack by keyword(s).

```
GET /buildpacks/:namespace/:name/:version
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **namespace** | *string* | the namespace component from the ID of the buildpack | `"projectriff"`
| **name** | *string* | the name component from the ID of the buildpack | `"command-function"`
| **version** | *string* | the version of the buildpack | `"1.4.1"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/buildpacks/projectriff/command-function/1.4.1"
```

#### Response Example

```json
{
  "description": "The Command Function Buildpack is a Cloud Native Buildpack V3 that provides riff Command Function Invoker to functions",
  "license": "MIT",
  "ns":"projectriff",
  "name":"command-function",
  "version": "1.4.1",
  "yanked":false,
  "addr":"gcr.io/projectriff/command-function@sha256:99f9054abb73635a9b251b61d3627a8ff86508c767f9d691c426d45e8758596f"
}
```

## Development

This project requires [Ruby](http://www.ruby-lang.org/en/) and [Golang](https://golang.org/) tooling.

Run the tests:

```
$ make test
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

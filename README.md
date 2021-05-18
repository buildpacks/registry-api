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
| **matches** | *string* | keyword(s) to search for | `"ruby"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/search?matches=ruby"
```

#### Response Example

```json
[
  {
    "latest": {
      "id": "a52bd991-0e17-46c0-a413-229b35943765",
      "namespace": "heroku",
      "name": "ruby",
      "version": "0.1.0",
      "addr": "public.ecr.aws/r2f9u0w4/heroku-ruby-buildpack@sha256:0f05ccc534c20fb54cc6f0c71df9b21b2952f74f528ed98f55d81c40434844fd",
      "yanked": false,
      "description": "",
      "homepage": "",
      "licenses": null,
      "stacks": [
        "heroku-18",
        "heroku-20"
      ],
      "created_at": "2021-03-04T16:20:27.189Z",
      "updated_at": "2021-05-16T04:24:52.556Z",
      "version_major": "0",
      "version_minor": "1",
      "version_patch": "0"
    },
    "versions": [
      {
        "version": "0.1.0",
        "_link": "https://registry.buildpacks.io/api/v1/buildpacks/heroku/ruby/0.1.0"
      }
    ]
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
| **namespace** | *string* | the namespace component from the ID of the buildpack | `"heroku"`
| **name** | *string* | the name component from the ID of the buildpack | `"ruby"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/buildpacks/heroku/ruby"
```

#### Response Example

```json
{
  "latest": {
    "version": "0.1.0",
    "namespace": "heroku",
    "name": "ruby",
    "description": "",
    "homepage": "",
    "licenses": null,
    "stacks": [
      "heroku-18",
      "heroku-20"
    ],
    "id": "a52bd991-0e17-46c0-a413-229b35943765"
  },
  "versions": [
    {
      "version": "0.1.0",
      "_link": "https://registry.buildpacks.io//api/v1/buildpacks/heroku/ruby/0.1.0"
    }
  ]
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
| **namespace** | *string* | the namespace component from the ID of the buildpack | `"heroku"`
| **name** | *string* | the name component from the ID of the buildpack | `"ruby"`
| **version** | *string* | the version of the buildpack | `"0.1.0"`

#### Request Example

```sh-session
$ curl "https://registry.buildpacks.io/api/v1/buildpacks/heroku/ruby/0.1.0"
```

#### Response Example

```json
{
  "id": "a52bd991-0e17-46c0-a413-229b35943765",
  "namespace": "heroku",
  "name": "ruby",
  "version": "0.1.0",
  "addr": "public.ecr.aws/r2f9u0w4/heroku-ruby-buildpack@sha256:0f05ccc534c20fb54cc6f0c71df9b21b2952f74f528ed98f55d81c40434844fd",
  "yanked": false,
  "description": "",
  "homepage": "",
  "licenses": null,
  "stacks": [
    "heroku-18",
    "heroku-20"
  ],
  "created_at": "2021-03-04T16:20:27.189Z",
  "updated_at": "2021-05-16T04:30:10.652Z",
  "version_major": "0",
  "version_minor": "1",
  "version_patch": "0"
}
```

## Development

This project requires [Ruby](http://www.ruby-lang.org/en/), [Rails](http://rubyonrails.org/) and [Golang](https://golang.org/) tooling.

1. Install Ruby determined by `.ruby-version` file.
2. Install Rails and Golang.
3. `bundle install` to install all the dependencies in your `Gemfile`
4. `yarn install` to install all the dependencies in `yarn.lock` file

This app uses [PostgreSQL](https://www.postgresql.org/). To set up the database, run:

```
$ bundle exec rake db:create
$ bundle exec rake db:migrate
```
Run the tests:

```
$ make test
```
Then run the app:

```
$ bundle exec rails s
```

In other terminal session, run the background worker to create the index:

```
$ make index
```

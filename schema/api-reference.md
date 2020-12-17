<a name="#resource-buildpack"></a>
## Buildpack

Stability: `prototype`

Buildpacks indexed in the Cloud Native Buildpack Registry.


### Attributes

<details>
  <summary>Details</summary>


| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **name** | *string* | name of buildpack | `"java"` |
| **namespace** | *string* | namespace of buildpack | `"acme"` |
| **version** | *string* | version of buildpack | `"1.0.0"` |

</details>

<a name="link-GET-buildpack-/buildpacks/{(%23%2Fdefinitions%2Fbuildpack%2Fdefinitions%2Fnamespace)}/{(%23%2Fdefinitions%2Fbuildpack%2Fdefinitions%2Fname)}/{(%23%2Fdefinitions%2Fbuildpack%2Fdefinitions%2Fversion)}"></a>
### Buildpack Info

<details>
  <summary>Details</summary>

Info for a specific buildpack version.

```
GET /buildpacks/{buildpack_namespace}/{buildpack_name}/{buildpack_version}
```


#### Curl Example

```bash
$ curl -n https://registry.buildpacks.io/api/v1/buildpacks/$BUILDPACK_NAMESPACE/$BUILDPACK_NAME/$BUILDPACK_VERSION
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "name": "java",
  "namespace": "acme",
  "version": "1.0.0"
}
```

</details>

<a name="link-GET-buildpack-/buildpacks/{(%23%2Fdefinitions%2Fbuildpack%2Fdefinitions%2Fnamespace)}/{(%23%2Fdefinitions%2Fbuildpack%2Fdefinitions%2Fname)}"></a>
### Buildpack List

<details>
  <summary>Details</summary>

List of versions for buildpack.

```
GET /buildpacks/{buildpack_namespace}/{buildpack_name}
```


#### Curl Example

```bash
$ curl -n https://registry.buildpacks.io/api/v1/buildpacks/$BUILDPACK_NAMESPACE/$BUILDPACK_NAME
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
[
  {
    "name": "java",
    "namespace": "acme",
    "version": "1.0.0"
  }
]
```

</details>


<a name="#resource-search"></a>
## Search

Stability: `prototype`

Search for Buildpacks in the Registry


### Attributes

<details>
  <summary>Details</summary>


| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **[latest:name](#resource-buildpack)** | *string* | name of buildpack | `"java"` |
| **[latest:namespace](#resource-buildpack)** | *string* | namespace of buildpack | `"acme"` |
| **[latest:version](#resource-buildpack)** | *string* | version of buildpack | `"1.0.0"` |
| **[versions:<version>:name](#resource-buildpack)** | *string* | name of buildpack | `"java"` |
| **[versions:<version>:namespace](#resource-buildpack)** | *string* | namespace of buildpack | `"acme"` |
| **[versions:<version>:version](#resource-buildpack)** | *string* | version of buildpack | `"1.0.0"` |

</details>

<a name="link-GET-search-/search"></a>
### Search Search

<details>
  <summary>Details</summary>

Search for buildpacks matching a keyword.

```
GET /search
```


#### Curl Example

```bash
$ curl -n https://registry.buildpacks.io/api/v1/search
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
[
  {
    "latest": {
      "namespace": "acme",
      "name": "java",
      "version": "1.0.0"
    },
    "versions": {
      "<version>": {
        "namespace": "acme",
        "name": "java",
        "version": "1.0.0"
      }
    }
  }
]
```

</details>



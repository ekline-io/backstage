# Release v1.5.0

## @backstage/backend-app-api@0.2.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`.
  The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/backend-common@0.15.0

### Minor Changes

- 12e9b54f0e: Added back support for when no branch provides to the UrlReader for Bitbucket Server.
- 30012e7d8c: Added `force` and `remoteRef` option to `push` method in `git` actions, and added `addRemote` and `deleteRemote` methods to `git` actions.

### Patch Changes

- fc8a5f797b: Improved `scm/git` wrapper around `isomorphic-git` library by adding `checkout` function and optional `remoteRef` parameter in the `push` function.
- 5e4dc173f7: Added a second validation to the `dir()` method of ZIP archive responses returned from `readTree()` to ensure that extracted files don't fall outside the target directory.
- 1732a18a7a: Exported `redactLogLine` function for use in custom loggers and renamed it to `redactWinstonLogLine`.
- 3b7930b3e5: Added support for Bearer Authorization header / token-based auth at Git commands.
- cfa078e255: The `ZipArchiveResponse` now correctly handles corrupt ZIP archives by switching the `zip` parsing library and ensuring correct parsing by writing to a temporary directory and loading from disk.
- 770d3f92c4: The config prop `ensureExists` now applies to schema creation when `pluginDivisionMode` uses `schema`, preventing accidental automatic schema creation.
- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.

- Updated dependencies
  - @backstage/integration@1.3.0

## @backstage/backend-defaults@0.1.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`.
  The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.

### Patch Changes

- Updated dependencies
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/core-components@0.11.0

### Minor Changes

- d0eefc499a: Made the `to` prop of `Button` and `Link` more strict, supporting only plain strings to prevent unexpected runtime results.

### Patch Changes

- a22af3edc8: Added a `className` prop to the `MarkdownContent` component.
- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/integration@1.3.0

### Minor Changes

- 593dea6710: Added support for Basic Auth for Bitbucket Server.
- ad35364e97: Added edit button support for Bitbucket Server in techdocs.

### Patch Changes

- 163243a4d1: Handled incorrect return type from Octokit paginate plugin to resolve reading URLs from GitHub.
- c4b460a47d: Avoided double encoding of the file path in `getBitbucketDownloadUrl`.
- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- 1f27d83933: Fixed bug in `getGitLabFileFetchUrl` for paths without `/-/`, ensuring support for private-token authentication.

## @techdocs/cli@1.2.0

### Minor Changes

- 855952db53: Added CLI option `--docker-option` to pass additional options to the `docker run` command executed by `serve` and `serve:mkdocs`.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-techdocs-node@1.3.0

## @backstage/plugin-adr@0.2.0

### Minor Changes

- bfc7c50a09: Displayed associated entity as a chip in `AdrSearchResultListItem`.

  **BREAKING:** `AdrDocument` now includes an `entityRef` property; custom `AdrParser` implementations must include this property in returned documents.

### Patch Changes

- Updated dependencies
  - @backstage/plugin-adr-common@0.2.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-adr-backend@0.2.0

### Minor Changes

- bfc7c50a09: Displayed associated entity as a chip in `AdrSearchResultListItem`.

  **BREAKING:** `AdrDocument` now includes an `entityRef` property; custom `AdrParser` implementations must include this property in returned documents.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-adr-common@0.2.0
  - @backstage/integration@1.3.0

## @backstage/plugin-catalog@1.5.0

### Minor Changes

- 80da5162c7: Modified the catalog plugin to use an experimental feature for customizing the create button title.

  Users can modify it using:

  ```typescript
  import { catalogPlugin } from '@backstage/plugin-catalog';

  catalogPlugin.__experimentalReconfigure({
    createButtonTitle: 'New',
  });
  ```

- fe94398418: Allowed changing the subtitle of the `CatalogTable` component.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-catalog-backend-module-bitbucket-server@0.1.0

### Minor Changes

- f7607f9d85: Added `BitbucketServerEntityProvider` as a replacement for `BitbucketDiscoveryProcessor` for Bitbucket Server.

  **Migration Instructions:**

  **Before:**

  ```typescript
  builder.addProcessor(
    BitbucketDiscoveryProcessor.fromConfig(env.config, { logger: env.logger }),
  );
  ```

  ```yaml
  catalog:
    locations:
      - type: bitbucket-discovery
        target: 'https://bitbucket.mycompany.com/projects/*/repos/*/catalog-info.yaml'
  ```

  **After:**

  ```typescript
  builder.addEntityProvider(
    BitbucketServerEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 30 },
        timeout: { minutes: 3 },
      }),
    }),
  );
  ```

  ```yaml
  catalog:
    providers:
      bitbucketServer:
        yourProviderId:
          catalogPath: /catalog-info.yaml
          filters:
            projectKey: '.*'
            repoSlug: '.*'
  ```

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-github-issues@0.1.0

### Minor Changes

- ffd5e47fb5: Added a new plugin for displaying GitHub Issues.

### Patch Changes

- 347ea327c2: Moved communication with GitHub GraphQL API to a dedicated plugin API, fixing issues where the system did not render GitHub Issues on partial failure from the API.
- b522f49403: Updated dependency `@spotify/prettier-config` to `^14.0.0`.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-scaffolder@1.5.0

### Minor Changes

- c4b452e16a: Began implementing the Wizard page for the `next` scaffolder plugin.

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-scaffolder-backend@1.5.0

### Minor Changes

- c4b452e16a: Began implementing the Wizard page for the `next` scaffolder plugin.
- 593dea6710: Added support for Basic Auth for Bitbucket Server.
- 3b7930b3e5: Added support for Bearer Authorization header / token-based auth at Git commands.
- 3f1316f1c5: Utilized Bearer Authorization header with token-based auth at Bitbucket Server.
- eeff5046ae: Updated `publish:gitlab:merge-request` action to allow commit updates and deletes.
- 692d5d3405: Added `reviewers` and `teamReviewers` parameters to `publish:github:pull-request` action to add reviewers to the pull request created by the action.

### Patch Changes

- fc8a5f797b: Added a `publish:gerrit:review` scaffolder action.
- c971afbf21: Deprecated `publish:file` action in favor of using the template editor for testing templates.
- b10b6c4aa4: Fixed issue on Windows where templated files weren't skipped as intended.
- 56e1b4b89c: Fixed typos in alpha types.
- dad0f65494: Fail if an invalid `Authorization` header passes to `POST /v2/tasks`.
- 014b3b7776: Added missing `res.end()` in scaffolder backend `EventStream` usage.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-shortcuts@0.3.0

### Minor Changes

- 5b769fddb5: Replaced internal observable with a mapping from the storage API, fixing shortcuts initialization when using Firestore.

  The `ShortcutApi.get` method, which returns an immediate snapshot of shortcuts, is now public.

  Example of how to get and observe `shortcuts`:

  ```typescript
  const shortcutApi = useApi(shortcutsApiRef);
  const shortcuts = useObservable(shortcutApi.shortcut$(), shortcutApi.get());
  ```

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-sonarqube@0.4.0

### Minor Changes

- 619b515172: **BREAKING CHANGE** This plugin now calls the `sonarqube-backend` plugin instead of relying on the proxy plugin.

  The proxy's `'/sonarqube':` key can be removed from your configuration files.

  Refer to the [README in the sonarqube-backend plugin page](https://github.com/backstage/backstage/tree/v1.5.0/plugins/sonarqube-backend/README.md) for setup instructions.

### Patch Changes

- f9c310a439: Added ability to provide an optional Sonarqube instance in the annotation in the `catalog-info.yaml` file.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-sonarqube-backend@0.1.0

### Minor Changes

- e2be9ab3a4: Initial creation of the plugin.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-techdocs-node@1.3.0

### Minor Changes

- ad35364e97: Added edit button support for Bitbucket Server.

### Patch Changes

- c8196bd37d: Fixed AWS S3 404 NotFound error.

  When reading an object from the S3 bucket through a stream, the aws-sdk getObject() API may throw a 404 NotFound Error with no error message or any HTTP-layer error responses. These fail the @backstage/error's assertError() checks, so wrap them. The test for this case was also updated to match the wrapped error message.

- f833344611: Bumped default `TechDocs` image to `v1.1.0`, see the release [here](https://github.com/backstage/techdocs-container/releases/tag/v1.1.0).

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/app-defaults@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/backend-plugin-api@0.1.1

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 34c2f5aca1: The factory returned by `createBackendPlugin` and `createBackendModule` no longer requires a parameter if the options are optional.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4

## @backstage/backend-tasks@0.3.4

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/backend-test-utils@0.1.27

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 56e1b4b89c: Added alpha test helpers for the new experimental backend system.
- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/backend-common@0.15.0
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/cli@0.18.1

### Patch Changes

- d45bbfeb69: Linting is now ignored for any `.eslintrc.*` files, not just `.eslintrc.js`.
- 72c228fdb8: Fixed a bug where `NODE_ENV` wasn't set in the environment when starting the backend in development mode. It has always been the case that Webpack transformed `NODE_ENV` when running in development mode, but this didn't affect dependencies in `node_modules` as they're treated as external.
- a539564c0d: Added Backstage version to output of `yarn backstage-cli info` command.
- fd68d6f138: Added resolution of `.json` and `.wasm` files to the Webpack configuration in order to match defaults.
- 94155a41e0: Updated dependencies `@svgr/*` to `6.3.x`.

## @backstage/core-app-api@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/core-plugin-api@1.0.5

### Patch Changes

- 80da5162c7: Introduced a new experimental feature allowing the declaration of plugin-wide options using `__experimentalConfigure` in your `createPlugin` options. See <https://backstage.io/docs/plugins/customization.md> for more information.

  **Note:** This is an experimental feature and may have breaking changes in the future.

- 87649a06bf: Added a note that the `fetchApi` utility shouldn't be used in sign-in page implementations and similar.

## @backstage/create-app@0.4.30

### Patch Changes

- 73cee58fc2: Bumped create-app version.

- f762386d48: Bumped create-app version.

- b162bbf464: Bumped create-app version.

- db76fc6255: Moved `better-sqlite3` dependency back to production `"dependencies"` in `packages/backend/package.json`, with Dockerfile instructions to move it to `"devDependencies"` if desired. No need to apply this change to existing apps unless you want SQLite in the production image as a database option.

- ab9edd8b58: Updated backend to write stack trace when the backend fails to start up.

  **Instructions for Update:**

  Change `packages/backend/src/index.ts` as follows:

  ```diff
      cors:
      origin: http://localhost:3000
  -    console.error(`Backend failed to start up, ${error}`);
  +    console.error('Backend failed to start up', error);
  ```

- 0174a0a022: Added `PATCH` and `HEAD` to `Access-Control-Allow-Methods`.

  **Instructions for Update:**

  Modify `app-config.yaml` as follows:

  ```diff
     cors:
       origin: http://localhost:3000
  -    methods: [GET, POST, PUT, DELETE]
  +    methods: [GET, POST, PUT, DELETE, PATCH, HEAD]
  ```

## @backstage/dev-utils@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3

## @backstage/integration-react@1.1.3

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/test-utils@1.1.3

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-airbrake@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/dev-utils@1.0.5
  - @backstage/test-utils@1.1.3

## @backstage/plugin-airbrake-backend@0.2.8

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-allure@0.1.24

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-analytics-module-ga@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-apache-airflow@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-api-docs@0.8.8

### Patch Changes

- dae12c71cf: Updated dependency `@asyncapi/react-component` to `1.0.0-next.40`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-apollo-explorer@0.1.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-app-backend@0.3.35

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-auth-backend@0.15.1

### Patch Changes

- c676a9e07b: Fixed a bug in the auth plugin on the backend where it ignored the skip migration database options when using the database provider.
- 2d7d6028e1: Updated dependency `@google-cloud/firestore` to `^6.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-auth-node@0.2.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-azure-devops@0.1.24

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-azure-devops-backend@0.3.14

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-badges@0.2.32

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-badges-backend@0.1.29

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-bazaar@0.1.23

### Patch Changes

- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-bazaar-backend@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-test-utils@0.1.27

## @backstage/plugin-bitbucket-cloud-common@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0

## @backstage/plugin-bitrise@0.1.35

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-catalog-backend@1.3.1

### Patch Changes

- 56e1b4b89c: Fixed typos in alpha types.

- e3d3018531: Fixed issue for conditional decisions based on properties stored as arrays, like tags.

  Before this change, permission policies returning conditional decisions based on metadata like tags, such as `createCatalogConditionalDecision(permission, catalogConditions.hasMetadata('tags', 'java'),)`, produced wrong results. The issue occurred when authorizing entities already loaded from the database, for example, when authorizing `catalogEntityDeletePermission`.

- 059ae348b4: Used the non-deprecated form of `table.unique` in knex.

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-permission-node@0.6.4

## @backstage/plugin-catalog-backend-module-aws@0.1.8

### Patch Changes

- 17d45dbf10: Deprecated `AwsS3DiscoveryProcessor` in favor of `AwsS3EntityProvider` (since v0.1.4).

  A migration guide is available at [the release notes for v0.1.4](https://github.com/backstage/backstage/blob/master/plugins/catalog-backend-module-aws/CHANGELOG.md#014).

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-azure@0.1.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-bitbucket@0.2.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1
  - @backstage/plugin-bitbucket-cloud-common@0.1.2

## @backstage/plugin-catalog-backend-module-bitbucket-cloud@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1
  - @backstage/plugin-bitbucket-cloud-common@0.1.2

## @backstage/plugin-catalog-backend-module-gerrit@0.1.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-github@0.1.6

### Patch Changes

- f48950e34b: Added GitHub Entity Provider functionality for adding entities to the catalog.

  This provider replaces the `GithubDiscoveryProcessor` functionality, offering more flexibility with scheduling ingestion, removing, and preventing orphaned entities.

  More information is available on the [GitHub Discovery](https://backstage.io/docs/integrations/github/discovery) page.

- c59d1ce487: Fixed bug where the repository filter included all archived repositories.

- 97f0a37378: Improved support for wildcards in `catalogPath`.

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-gitlab@0.1.6

### Patch Changes

- 24979413a4: Enhanced GitLab provider with filtering projects by pattern RegExp.

  ```yaml
  providers:
    gitlab:
      stg:
        host: gitlab.stg.company.io
        branch: main
        projectPattern: 'john/' # new option
        entityFilename: template.yaml
  ```

  With the aforementioned parameter, you can filter projects and keep only those belonging to the namespace "john".

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-ldap@0.5.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-msgraph@0.4.1

### Patch Changes

- b1995df9f3: Adjusted references in deprecation warnings to point to a stable URL/document.
- Updated dependencies
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-openapi@0.1.1

### Patch Changes

- b50e8e533b: Added an `$openapi` placeholder resolver that supports more use cases for resolving `$ref` instances. This change deprecates the recently added `OpenApiRefProcessor` in favor of the `openApiPlaceholderResolver`.

  Example usage:

  ```yaml
  apiVersion: backstage.io/v1alpha1
  kind: API
  metadata:
    name: example
    description: Example API
  spec:
    type: openapi
    lifecycle: production
    owner: team
    definition:
      $openapi: ./spec/openapi.yaml # By using $openapi, Backstage will now resolve all $ref instances
  ```

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-common@1.0.5

### Patch Changes

- 92103db537: Exported an aggregated list of all catalog permissions.

## @backstage/plugin-catalog-graph@0.2.20

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-catalog-graphql@0.3.12

### Patch Changes

- fa3eeee92d: Updated dependency `@graphql-tools/schema` to `^9.0.0`.

## @backstage/plugin-catalog-import@0.8.11

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-catalog-node@1.0.1

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 56e1b4b89c: Fixed typos in alpha types.
- Updated dependencies
  - @backstage/backend-plugin-api@0.1.1

## @backstage/plugin-catalog-react@1.1.3

### Patch Changes

- 44e691a7f9: Modified description column to not use auto width.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-cicd-statistics@0.1.10

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-cicd-statistics-module-gitlab@0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-cicd-statistics@0.1.10

## @backstage/plugin-circleci@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-cloudbuild@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-climate@0.1.8

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- 831a8fee86: Sent Authorization headers in fetch requests using FetchApi in Code Climate plugin to fix unauthorized requests to Backstage backends with authentication enabled.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-coverage@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-coverage-backend@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/plugin-codescene@0.1.3

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-config-schema@0.1.31

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-cost-insights@0.11.30

### Patch Changes

- b746eca638: Made `products` field optional in the config.
- daf4b33e34: Added name property to Group.
- 08562ebe11: Displayed minus sign in trends in `CostOverviewCard`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-cost-insights-common@0.1.1

## @backstage/plugin-cost-insights-common@0.1.1

### Patch Changes

- daf4b33e34: Added name property to Group.

## @backstage/plugin-dynatrace@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-explore@0.3.39

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-explore-react@0.0.20

## @backstage/plugin-explore-react@0.0.20

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-firehydrant@0.1.25

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-fossa@0.2.40

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-gcalendar@0.3.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-gcp-projects@0.3.27

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-git-release-manager@0.3.21

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-github-actions@0.5.8

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-github-deployments@0.1.39

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-github-pull-requests-board@0.1.2

### Patch Changes

- 73268a67ff: Fixed rendering when PR contains references to deleted GitHub accounts.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-gitops-profiles@0.3.26

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-gocd@0.1.14

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-graphiql@0.2.40

### Patch Changes

- 3a8ab72248: Minor internal tweak to lazy loading, improving module compatibility.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-graphql-backend@0.1.25

### Patch Changes

- fa3eeee92d: Updated dependency `@graphql-tools/schema` to `^9.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-catalog-graphql@0.3.12

## @backstage/plugin-home@0.4.24

### Patch Changes

- df7b9158b8: Added wrap-around for the listing of tools to prevent increasing width with name length.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-stack-overflow@0.1.4

## @backstage/plugin-ilert@0.1.34

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-jenkins@0.7.7

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-jenkins-common@0.1.7

## @backstage/plugin-jenkins-backend@0.1.25

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-jenkins-common@0.1.7

## @backstage/plugin-jenkins-common@0.1.7

### Patch Changes

- Updated dependencies
  - @backstage/plugin-catalog-common@1.0.5

## @backstage/plugin-kafka@0.3.8

### Minor Changes

- bde245f0bf: Added dashboard URL feature and fixed minor styling issues.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-kafka-backend@0.2.28

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-kubernetes@0.7.1

### Minor Changes

- 860ed68343: Fixed bug in `CronJobsAccordions` component that causes an error when cronjobs use a Kubernetes alias, such as `@hourly` or `@daily`, instead of standard cron syntax.
- f563b86a5b: Added namespace column to Kubernetes error reporting table.

### Patch Changes

- Updated dependencies
  - @backstage/plugin-kubernetes-common@0.4.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-kubernetes-backend@0.7.1

### Minor Changes

- 0297da83c0: Added `DaemonSets` to the default Kubernetes resources.
- 0cd87cf30d: Added a new `customResources` field to the `ClusterDetails` interface, allowing specification (override) of custom resources per cluster.

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-kubernetes-common@0.4.1
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-kubernetes-common@0.4.1

### Minor Changes

- 0297da83c0: Added `DaemonSets` to the default Kubernetes resources.

## @backstage/plugin-lighthouse@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-newrelic@0.3.26

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-newrelic-dashboard@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-org@0.5.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-pagerduty@0.5.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-periskop@0.1.6

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-periskop-backend@0.1.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-permission-backend@0.5.10

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/plugin-permission-node@0.6.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-permission-react@0.4.4

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-proxy-backend@0.2.29

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-rollbar@0.4.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-rollbar-backend@0.1.32

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-scaffolder-backend-module-cookiecutter@0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-scaffolder-backend-module-rails@0.4.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-scaffolder-backend-module-yeoman@0.2.8

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-search@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-search-backend@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-permission-node@0.6.4
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-module-elasticsearch@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-module-pg@0.3.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-node@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4

## @backstage/plugin-search-react@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-sentry@0.4.1

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-splunk-on-call@0.3.32

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-stack-overflow@0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/plugin-home@0.4.24
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-stack-overflow-backend@0.1.4

### Patch Changes

- ea5631a8b2: Added API key as separate configuration.

## @backstage/plugin-tech-insights@0.2.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-tech-insights-common@0.2.6

## @backstage/plugin-tech-insights-backend@0.5.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-tech-insights-common@0.2.6
  - @backstage/plugin-tech-insights-node@0.3.3

## @backstage/plugin-tech-insights-backend-module-jsonfc@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-tech-insights-common@0.2.6
  - @backstage/plugin-tech-insights-node@0.3.3

## @backstage/plugin-tech-insights-common@0.2.6

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.

## @backstage/plugin-tech-insights-node@0.3.3

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-tech-insights-common@0.2.6

## @backstage/plugin-tech-radar@0.5.15

### Patch Changes

- a641f79dcb: Moved CSS overflow property to quadrant block element (that is, to a div element) in `RadarLegend` component.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-techdocs@1.3.1

### Patch Changes

- e924d2d013: Added back reduction in size, fixing the large TechDocs headings.
- b86ed4d990: Added highlight to active navigation item and navigation parents.
- 7a98c73dc8: Fixed TechDocs sidebar layout bug for medium devices.
- 8acb22205c: Scrolled TechDocs navigation into focus and expanded any nested navigation items.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-techdocs-addons-test-utils@1.0.3

### Patch Changes

- Updated dependencies
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-techdocs-backend@1.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-techdocs-node@1.3.0
  - @backstage/plugin-catalog-common@1.0.5

## @backstage/plugin-techdocs-module-addons-contrib@1.0.3

### Patch Changes

- ad35364e97: Added edit button support for Bitbucket Server in techdocs.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-techdocs-react@1.0.3

### Minor Changes

- 29d6cf0147: Added `toLowerEntityRefMaybe()` helper function for handling `techdocs.legacyUseCaseSensitiveTripletPaths` flag.
  Modified `entityRef` to handle `techdocs.legacyUseCaseSensitiveTripletPaths` flag in `TechDocsReaderPageContext`.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-todo@0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-todo-backend@0.1.32

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/plugin-user-settings@0.4.7

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-vault@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-vault-backend@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-test-utils@0.1.27
  - @backstage/backend-tasks@0.3.4

## @backstage/plugin-xcmetrics@0.2.28

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## example-app@0.2.74

### Patch Changes

- Updated dependencies
  - @backstage/plugin-kubernetes@0.7.1
  - @backstage/cli@0.18.1
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/plugin-home@0.4.24
  - @backstage/core-components@0.11.0
  - @backstage/plugin-scaffolder@1.5.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-cost-insights@0.11.30
  - @backstage/plugin-graphiql@0.2.40
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-kafka@0.3.8
  - @backstage/plugin-techdocs-module-addons-contrib@1.0.3
  - @backstage/plugin-gocd@0.1.14
  - @backstage/plugin-sentry@0.4.1
  - @backstage/plugin-api-docs@0.8.8
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/plugin-shortcuts@0.3.0
  - @backstage/plugin-tech-radar@0.5.15
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-airbrake@0.3.8
  - @backstage/plugin-apache-airflow@0.2.1
  - @backstage/plugin-azure-devops@0.1.24
  - @backstage/plugin-badges@0.2.32
  - @internal/plugin-catalog-customized@0.0.1
  - @backstage/plugin-catalog-graph@0.2.20
  - @backstage/plugin-catalog-import@0.8.11
  - @backstage/plugin-circleci@0.3.8
  - @backstage/plugin-cloudbuild@0.3.8
  - @backstage/plugin-code-coverage@0.2.1
  - @backstage/plugin-dynatrace@0.1.2
  - @backstage/plugin-explore@0.3.39
  - @backstage/plugin-gcalendar@0.3.4
  - @backstage/plugin-gcp-projects@0.3.27
  - @backstage/plugin-github-actions@0.5.8
  - @backstage/plugin-jenkins@0.7.7
  - @backstage/plugin-lighthouse@0.3.8
  - @backstage/plugin-newrelic@0.3.26
  - @backstage/plugin-newrelic-dashboard@0.2.1
  - @backstage/plugin-org@0.5.8
  - @backstage/plugin-pagerduty@0.5.1
  - @backstage/plugin-permission-react@0.4.4
  - @backstage/plugin-rollbar@0.4.8
  - @backstage/plugin-search@1.0.1
  - @backstage/plugin-search-react@1.0.1
  - @backstage/plugin-stack-overflow@0.1.4
  - @backstage/plugin-tech-insights@0.2.4
  - @backstage/plugin-todo@0.2.10
  - @backstage/plugin-user-settings@0.4.7

## example-backend@0.2.74

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-kubernetes-backend@0.7.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0
  - @backstage/plugin-auth-backend@0.15.1
  - @backstage/plugin-graphql-backend@0.1.25
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-tech-insights-node@0.3.3
  - @backstage/plugin-catalog-backend@1.3.1
  - example-app@0.2.74
  - @backstage/plugin-app-backend@0.3.35
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-azure-devops-backend@0.3.14
  - @backstage/plugin-badges-backend@0.1.29
  - @backstage/plugin-code-coverage-backend@0.2.1
  - @backstage/plugin-jenkins-backend@0.1.25
  - @backstage/plugin-kafka-backend@0.2.28
  - @backstage/plugin-permission-backend@0.5.10
  - @backstage/plugin-permission-node@0.6.4
  - @backstage/plugin-proxy-backend@0.2.29
  - @backstage/plugin-rollbar-backend@0.1.32
  - @backstage/plugin-scaffolder-backend-module-rails@0.4.3
  - @backstage/plugin-search-backend@1.0.1
  - @backstage/plugin-search-backend-module-elasticsearch@1.0.1
  - @backstage/plugin-search-backend-module-pg@0.3.6
  - @backstage/plugin-search-backend-node@1.0.1
  - @backstage/plugin-tech-insights-backend@0.5.1
  - @backstage/plugin-tech-insights-backend-module-jsonfc@0.1.19
  - @backstage/plugin-techdocs-backend@1.2.1
  - @backstage/plugin-todo-backend@0.1.32

## example-backend-next@0.0.2

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-backend@1.5.0
  - @backstage/backend-defaults@0.1.0
  - @backstage/plugin-catalog-backend@1.3.1

## techdocs-cli-embedded-app@0.2.73

### Patch Changes

- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3

## @internal/plugin-catalog-customized@0.0.1

### Patch Changes

- Updated dependencies
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @internal/plugin-todo-list@1.0.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @internal/plugin-todo-list-backend@1.0.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## New Features and API Changes

### @backstage/plugin-events-backend@0.1.0

#### Minor Changes

- Introduced a new feature for custom HTTP POST body parsers to enhance flexibility in handling different content types in event-related HTTP requests.

#### API Changes

- Added `addHttpPostBodyParser` method in the events extension API to allow users to define custom parsers for different content types.

  ```typescript
  // Example usage
  eventExtensionApi.addHttpPostBodyParser('text/plain', (body) => {
    return { parsedText: body.toString() };
  });
  ```

### Behavior Changes

- `HttpPostIngressEventPublisher` now supports configurable body parsers, including default parsers like `application/json`.
- Users can add support for additional media types, such as `text/plain` or `application/x-www-form-urlencoded`.

### Testing and Validation

- Added tests to validate the new feature, covering scenarios like handling unsupported media types and verifying custom parser implementations.
- Improved request handling capabilities with robust tests.

### Documentation Updates

- Updated `plugins/events-backend/README.md` with instructions on using the new body parser feature.
- Provided a guide on implementing and utilizing custom parsers.

### Purpose and Impact

- These changes provide a flexible and robust system for handling various content types in HTTP POST requests within the events system, improving the robustness and flexibility of event handling in Backstage plugins.

### Visual Aids and Examples

- Included code snippets and examples to demonstrate new features and changes.
- Use diagrams or flowcharts where necessary to illustrate complex interactions or configurations.

### Review and Quality Assurance

- Ensured technical accuracy and clarity in the updated documentation.
- Confirmed comprehensive coverage of all new features and changes for ease of understanding by both new and existing users.# Release v1.5.0

## @backstage/backend-app-api@0.2.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`.
  The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/backend-common@0.15.0

### Minor Changes

- 12e9b54f0e: Added back support for when no branch provides to the UrlReader for Bitbucket Server.
- 30012e7d8c: Added `force` and `remoteRef` option to `push` method in `git` actions, and added `addRemote` and `deleteRemote` methods to `git` actions.

### Patch Changes

- fc8a5f797b: Improved `scm/git` wrapper around `isomorphic-git` library by adding `checkout` function and optional `remoteRef` parameter in the `push` function.
- 5e4dc173f7: Added a second validation to the `dir()` method of ZIP archive responses returned from `readTree()` to ensure that extracted files don't fall outside the target directory.
- 1732a18a7a: Exported `redactLogLine` function for use in custom loggers and renamed it to `redactWinstonLogLine`.
- 3b7930b3e5: Added support for Bearer Authorization header / token-based auth at Git commands.
- cfa078e255: The `ZipArchiveResponse` now correctly handles corrupt ZIP archives by switching the `zip` parsing library and ensuring correct parsing by writing to a temporary directory and loading from disk.
- 770d3f92c4: The config prop `ensureExists` now applies to schema creation when `pluginDivisionMode` uses `schema`, preventing accidental automatic schema creation.
- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.

- Updated dependencies
  - @backstage/integration@1.3.0

## @backstage/backend-defaults@0.1.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`.
  The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.

### Patch Changes

- Updated dependencies
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/core-components@0.11.0

### Minor Changes

- d0eefc499a: Made the `to` prop of `Button` and `Link` more strict, supporting only plain strings to prevent unexpected runtime results.

### Patch Changes

- a22af3edc8: Added a `className` prop to the `MarkdownContent` component.
- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/integration@1.3.0

### Minor Changes

- 593dea6710: Added support for Basic Auth for Bitbucket Server.
- ad35364e97: Added edit button support for Bitbucket Server in techdocs.

### Patch Changes

- 163243a4d1: Handled incorrect return type from Octokit paginate plugin to resolve reading URLs from GitHub.
- c4b460a47d: Avoided double encoding of the file path in `getBitbucketDownloadUrl`.
- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- 1f27d83933: Fixed bug in `getGitLabFileFetchUrl` for paths without `/-/`, ensuring support for private-token authentication.

## @techdocs/cli@1.2.0

### Minor Changes

- 855952db53: Added CLI option `--docker-option` to pass additional options to the `docker run` command executed by `serve` and `serve:mkdocs`.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-techdocs-node@1.3.0

## @backstage/plugin-adr@0.2.0

### Minor Changes

- bfc7c50a09: Displayed associated entity as a chip in `AdrSearchResultListItem`.

  **BREAKING:** `AdrDocument` now includes an `entityRef` property; custom `AdrParser` implementations must include this property in returned documents.

### Patch Changes

- Updated dependencies
  - @backstage/plugin-adr-common@0.2.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-adr-backend@0.2.0

### Minor Changes

- bfc7c50a09: Displayed associated entity as a chip in `AdrSearchResultListItem`.

  **BREAKING:** `AdrDocument` now includes an `entityRef` property; custom `AdrParser` implementations must include this property in returned documents.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-adr-common@0.2.0
  - @backstage/integration@1.3.0

## @backstage/plugin-catalog@1.5.0

### Minor Changes

- 80da5162c7: Modified the catalog plugin to use an experimental feature for customizing the create button title.

  Users can modify it using:

  ```typescript
  import { catalogPlugin } from '@backstage/plugin-catalog';

  catalogPlugin.__experimentalReconfigure({
    createButtonTitle: 'New',
  });
  ```

- fe94398418: Allowed changing the subtitle of the `CatalogTable` component.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-catalog-backend-module-bitbucket-server@0.1.0

### Minor Changes

- f7607f9d85: Added `BitbucketServerEntityProvider` as a replacement for `BitbucketDiscoveryProcessor` for Bitbucket Server.

  **Migration Instructions:**

  **Before:**

  ```typescript
  builder.addProcessor(
    BitbucketDiscoveryProcessor.fromConfig(env.config, { logger: env.logger }),
  );
  ```

  ```yaml
  catalog:
    locations:
      - type: bitbucket-discovery
        target: 'https://bitbucket.mycompany.com/projects/*/repos/*/catalog-info.yaml'
  ```

  **After:**

  ```typescript
  builder.addEntityProvider(
    BitbucketServerEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 30 },
        timeout: { minutes: 3 },
      }),
    }),
  );
  ```

  ```yaml
  catalog:
    providers:
      bitbucketServer:
        yourProviderId:
          catalogPath: /catalog-info.yaml
          filters:
            projectKey: '.*'
            repoSlug: '.*'
  ```

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-github-issues@0.1.0

### Minor Changes

- ffd5e47fb5: Added a new plugin for displaying GitHub Issues.

### Patch Changes

- 347ea327c2: Moved communication with GitHub GraphQL API to a dedicated plugin API, fixing issues where the system did not render GitHub Issues on partial failure from the API.
- b522f49403: Updated dependency `@spotify/prettier-config` to `^14.0.0`.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-scaffolder@1.5.0

### Minor Changes

- c4b452e16a: Began implementing the Wizard page for the `next` scaffolder plugin.

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-scaffolder-backend@1.5.0

### Minor Changes

- c4b452e16a: Began implementing the Wizard page for the `next` scaffolder plugin.
- 593dea6710: Added support for Basic Auth for Bitbucket Server.
- 3b7930b3e5: Added support for Bearer Authorization header / token-based auth at Git commands.
- 3f1316f1c5: Utilized Bearer Authorization header with token-based auth at Bitbucket Server.
- eeff5046ae: Updated `publish:gitlab:merge-request` action to allow commit updates and deletes.
- 692d5d3405: Added `reviewers` and `teamReviewers` parameters to `publish:github:pull-request` action to add reviewers to the pull request created by the action.

### Patch Changes

- fc8a5f797b: Added a `publish:gerrit:review` scaffolder action.
- c971afbf21: Deprecated `publish:file` action in favor of using the template editor for testing templates.
- b10b6c4aa4: Fixed issue on Windows where templated files weren't skipped as intended.
- 56e1b4b89c: Fixed typos in alpha types.
- dad0f65494: Fail if an invalid `Authorization` header passes to `POST /v2/tasks`.
- 014b3b7776: Added missing `res.end()` in scaffolder backend `EventStream` usage.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-shortcuts@0.3.0

### Minor Changes

- 5b769fddb5: Replaced internal observable with a mapping from the storage API, fixing shortcuts initialization when using Firestore.

  The `ShortcutApi.get` method, which returns an immediate snapshot of shortcuts, is now public.

  Example of how to get and observe `shortcuts`:

  ```typescript
  const shortcutApi = useApi(shortcutsApiRef);
  const shortcuts = useObservable(shortcutApi.shortcut$(), shortcutApi.get());
  ```

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-sonarqube@0.4.0

### Minor Changes

- 619b515172: **BREAKING CHANGE** This plugin now calls the `sonarqube-backend` plugin instead of relying on the proxy plugin.

  The proxy's `'/sonarqube':` key can be removed from your configuration files.

  Refer to the [README in the sonarqube-backend plugin page](https://github.com/backstage/backstage/tree/v1.5.0/plugins/sonarqube-backend/README.md) for setup instructions.

### Patch Changes

- f9c310a439: Added ability to provide an optional Sonarqube instance in the annotation in the `catalog-info.yaml` file.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-sonarqube-backend@0.1.0

### Minor Changes

- e2be9ab3a4: Initial creation of the plugin.

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-techdocs-node@1.3.0

### Minor Changes

- ad35364e97: Added edit button support for Bitbucket Server.

### Patch Changes

- c8196bd37d: Fixed AWS S3 404 NotFound error.

  When reading an object from the S3 bucket through a stream, the aws-sdk getObject() API may throw a 404 NotFound Error with no error message or any HTTP-layer error responses. These fail the @backstage/error's assertError() checks, so wrap them. The test for this case was also updated to match the wrapped error message.

- f833344611: Bumped default `TechDocs` image to `v1.1.0`, see the release [here](https://github.com/backstage/techdocs-container/releases/tag/v1.1.0).

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/app-defaults@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/backend-plugin-api@0.1.1

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 34c2f5aca1: The factory returned by `createBackendPlugin` and `createBackendModule` no longer requires a parameter if the options are optional.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4

## @backstage/backend-tasks@0.3.4

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/backend-test-utils@0.1.27

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 56e1b4b89c: Added alpha test helpers for the new experimental backend system.
- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/backend-common@0.15.0
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/cli@0.18.1

### Patch Changes

- d45bbfeb69: Linting is now ignored for any `.eslintrc.*` files, not just `.eslintrc.js`.
- 72c228fdb8: Fixed a bug where `NODE_ENV` wasn't set in the environment when starting the backend in development mode. It has always been the case that Webpack transformed `NODE_ENV` when running in development mode, but this didn't affect dependencies in `node_modules` as they're treated as external.
- a539564c0d: Added Backstage version to output of `yarn backstage-cli info` command.
- fd68d6f138: Added resolution of `.json` and `.wasm` files to the Webpack configuration in order to match defaults.
- 94155a41e0: Updated dependencies `@svgr/*` to `6.3.x`.

## @backstage/core-app-api@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/core-plugin-api@1.0.5

### Patch Changes

- 80da5162c7: Introduced a new experimental feature allowing the declaration of plugin-wide options using `__experimentalConfigure` in your `createPlugin` options. See <https://backstage.io/docs/plugins/customization.md> for more information.

  **Note:** This is an experimental feature and may have breaking changes in the future.

- 87649a06bf: Added a note that the `fetchApi` utility shouldn't be used in sign-in page implementations and similar.

## @backstage/create-app@0.4.30

### Patch Changes

- 73cee58fc2: Bumped create-app version.

- f762386d48: Bumped create-app version.

- b162bbf464: Bumped create-app version.

- db76fc6255: Moved `better-sqlite3` dependency back to production `"dependencies"` in `packages/backend/package.json`, with Dockerfile instructions to move it to `"devDependencies"` if desired. No need to apply this change to existing apps unless you want SQLite in the production image as a database option.

- ab9edd8b58: Updated backend to write stack trace when the backend fails to start up.

  **Instructions for Update:**

  Change `packages/backend/src/index.ts` as follows:

  ```diff
      cors:
      origin: http://localhost:3000
  -    console.error(`Backend failed to start up, ${error}`);
  +    console.error('Backend failed to start up', error);
  ```

- 0174a0a022: Added `PATCH` and `HEAD` to `Access-Control-Allow-Methods`.

  **Instructions for Update:**

  Modify `app-config.yaml` as follows:

  ```diff
     cors:
       origin: http://localhost:3000
  -    methods: [GET, POST, PUT, DELETE]
  +    methods: [GET, POST, PUT, DELETE, PATCH, HEAD]
  ```

## @backstage/dev-utils@1.0.5

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3

## @backstage/integration-react@1.1.3

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/test-utils@1.1.3

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-airbrake@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/dev-utils@1.0.5
  - @backstage/test-utils@1.1.3

## @backstage/plugin-airbrake-backend@0.2.8

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-allure@0.1.24

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-analytics-module-ga@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-apache-airflow@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-api-docs@0.8.8

### Patch Changes

- dae12c71cf: Updated dependency `@asyncapi/react-component` to `1.0.0-next.40`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-apollo-explorer@0.1.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-app-backend@0.3.35

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-auth-backend@0.15.1

### Patch Changes

- c676a9e07b: Fixed a bug in the auth plugin on the backend where it ignored the skip migration database options when using the database provider.
- 2d7d6028e1: Updated dependency `@google-cloud/firestore` to `^6.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-auth-node@0.2.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-azure-devops@0.1.24

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-azure-devops-backend@0.3.14

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-badges@0.2.32

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-badges-backend@0.1.29

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-bazaar@0.1.23

### Patch Changes

- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-bazaar-backend@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-test-utils@0.1.27

## @backstage/plugin-bitbucket-cloud-common@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0

## @backstage/plugin-bitrise@0.1.35

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-catalog-backend@1.3.1

### Patch Changes

- 56e1b4b89c: Fixed typos in alpha types.

- e3d3018531: Fixed issue for conditional decisions based on properties stored as arrays, like tags.

  Before this change, permission policies returning conditional decisions based on metadata like tags, such as `createCatalogConditionalDecision(permission, catalogConditions.hasMetadata('tags', 'java'),)`, produced wrong results. The issue occurred when authorizing entities already loaded from the database, for example, when authorizing `catalogEntityDeletePermission`.

- 059ae348b4: Used the non-deprecated form of `table.unique` in knex.

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-permission-node@0.6.4

## @backstage/plugin-catalog-backend-module-aws@0.1.8

### Patch Changes

- 17d45dbf10: Deprecated `AwsS3DiscoveryProcessor` in favor of `AwsS3EntityProvider` (since v0.1.4).

  A migration guide is available at [the release notes for v0.1.4](https://github.com/backstage/backstage/blob/master/plugins/catalog-backend-module-aws/CHANGELOG.md#014).

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-azure@0.1.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-bitbucket@0.2.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1
  - @backstage/plugin-bitbucket-cloud-common@0.1.2

## @backstage/plugin-catalog-backend-module-bitbucket-cloud@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1
  - @backstage/plugin-bitbucket-cloud-common@0.1.2

## @backstage/plugin-catalog-backend-module-gerrit@0.1.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-github@0.1.6

### Patch Changes

- f48950e34b: Added GitHub Entity Provider functionality for adding entities to the catalog.

  This provider replaces the `GithubDiscoveryProcessor` functionality, offering more flexibility with scheduling ingestion, removing, and preventing orphaned entities.

  More information is available on the [GitHub Discovery](https://backstage.io/docs/integrations/github/discovery) page.

- c59d1ce487: Fixed bug where the repository filter included all archived repositories.

- 97f0a37378: Improved support for wildcards in `catalogPath`.

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-gitlab@0.1.6

### Patch Changes

- 24979413a4: Enhanced GitLab provider with filtering projects by pattern RegExp.

  ```yaml
  providers:
    gitlab:
      stg:
        host: gitlab.stg.company.io
        branch: main
        projectPattern: 'john/' # new option
        entityFilename: template.yaml
  ```

  With the aforementioned parameter, you can filter projects and keep only those belonging to the namespace "john".

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-ldap@0.5.2

### Patch Changes

- Updated dependencies
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-msgraph@0.4.1

### Patch Changes

- b1995df9f3: Adjusted references in deprecation warnings to point to a stable URL/document.
- Updated dependencies
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-backend-module-openapi@0.1.1

### Patch Changes

- b50e8e533b: Added an `$openapi` placeholder resolver that supports more use cases for resolving `$ref` instances. This change deprecates the recently added `OpenApiRefProcessor` in favor of the `openApiPlaceholderResolver`.

  Example usage:

  ```yaml
  apiVersion: backstage.io/v1alpha1
  kind: API
  metadata:
    name: example
    description: Example API
  spec:
    type: openapi
    lifecycle: production
    owner: team
    definition:
      $openapi: ./spec/openapi.yaml # By using $openapi, Backstage will now resolve all $ref instances
  ```

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-catalog-node@1.0.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-catalog-common@1.0.5

### Patch Changes

- 92103db537: Exported an aggregated list of all catalog permissions.

## @backstage/plugin-catalog-graph@0.2.20

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-catalog-graphql@0.3.12

### Patch Changes

- fa3eeee92d: Updated dependency `@graphql-tools/schema` to `^9.0.0`.

## @backstage/plugin-catalog-import@0.8.11

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-catalog-node@1.0.1

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- 56e1b4b89c: Fixed typos in alpha types.
- Updated dependencies
  - @backstage/backend-plugin-api@0.1.1

## @backstage/plugin-catalog-react@1.1.3

### Patch Changes

- 44e691a7f9: Modified description column to not use auto width.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-permission-react@0.4.4

## @backstage/plugin-cicd-statistics@0.1.10

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-cicd-statistics-module-gitlab@0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-cicd-statistics@0.1.10

## @backstage/plugin-circleci@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-cloudbuild@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-climate@0.1.8

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- 831a8fee86: Sent Authorization headers in fetch requests using FetchApi in Code Climate plugin to fix unauthorized requests to Backstage backends with authentication enabled.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-coverage@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-code-coverage-backend@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/plugin-codescene@0.1.3

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-config-schema@0.1.31

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-cost-insights@0.11.30

### Patch Changes

- b746eca638: Made `products` field optional in the config.
- daf4b33e34: Added name property to Group.
- 08562ebe11: Displayed minus sign in trends in `CostOverviewCard`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-cost-insights-common@0.1.1

## @backstage/plugin-cost-insights-common@0.1.1

### Patch Changes

- daf4b33e34: Added name property to Group.

## @backstage/plugin-dynatrace@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-explore@0.3.39

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-explore-react@0.0.20

## @backstage/plugin-explore-react@0.0.20

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-firehydrant@0.1.25

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-fossa@0.2.40

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-gcalendar@0.3.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-gcp-projects@0.3.27

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-git-release-manager@0.3.21

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-github-actions@0.5.8

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-github-deployments@0.1.39

### Patch Changes

- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-github-pull-requests-board@0.1.2

### Patch Changes

- 73268a67ff: Fixed rendering when PR contains references to deleted GitHub accounts.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-gitops-profiles@0.3.26

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-gocd@0.1.14

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-graphiql@0.2.40

### Patch Changes

- 3a8ab72248: Minor internal tweak to lazy loading, improving module compatibility.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-graphql-backend@0.1.25

### Patch Changes

- fa3eeee92d: Updated dependency `@graphql-tools/schema` to `^9.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-catalog-graphql@0.3.12

## @backstage/plugin-home@0.4.24

### Patch Changes

- df7b9158b8: Added wrap-around for the listing of tools to prevent increasing width with name length.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-stack-overflow@0.1.4

## @backstage/plugin-ilert@0.1.34

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-jenkins@0.7.7

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-jenkins-common@0.1.7

## @backstage/plugin-jenkins-backend@0.1.25

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-jenkins-common@0.1.7

## @backstage/plugin-jenkins-common@0.1.7

### Patch Changes

- Updated dependencies
  - @backstage/plugin-catalog-common@1.0.5

## @backstage/plugin-kafka@0.3.8

### Minor Changes

- bde245f0bf: Added dashboard URL feature and fixed minor styling issues.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-kafka-backend@0.2.28

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-kubernetes@0.7.1

### Minor Changes

- 860ed68343: Fixed bug in `CronJobsAccordions` component that causes an error when cronjobs use a Kubernetes alias, such as `@hourly` or `@daily`, instead of standard cron syntax.
- f563b86a5b: Added namespace column to Kubernetes error reporting table.

### Patch Changes

- Updated dependencies
  - @backstage/plugin-kubernetes-common@0.4.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-kubernetes-backend@0.7.1

### Minor Changes

- 0297da83c0: Added `DaemonSets` to the default Kubernetes resources.
- 0cd87cf30d: Added a new `customResources` field to the `ClusterDetails` interface, allowing specification (override) of custom resources per cluster.

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-kubernetes-common@0.4.1
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-kubernetes-common@0.4.1

### Minor Changes

- 0297da83c0: Added `DaemonSets` to the default Kubernetes resources.

## @backstage/plugin-lighthouse@0.3.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-newrelic@0.3.26

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-newrelic-dashboard@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-org@0.5.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-pagerduty@0.5.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-periskop@0.1.6

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-periskop-backend@0.1.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-permission-backend@0.5.10

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/plugin-permission-node@0.6.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## @backstage/plugin-permission-react@0.4.4

### Patch Changes

- Updated dependencies
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-proxy-backend@0.2.29

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-rollbar@0.4.8

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-rollbar-backend@0.1.32

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0

## @backstage/plugin-scaffolder-backend-module-cookiecutter@0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-scaffolder-backend-module-rails@0.4.3

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-scaffolder-backend-module-yeoman@0.2.8

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-backend@1.5.0

## @backstage/plugin-search@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-search-backend@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-permission-node@0.6.4
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-module-elasticsearch@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-module-pg@0.3.6

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-search-backend-node@1.0.1

## @backstage/plugin-search-backend-node@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4

## @backstage/plugin-search-react@1.0.1

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-sentry@0.4.1

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-splunk-on-call@0.3.32

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-stack-overflow@0.1.4

### Patch Changes

- Updated dependencies
  - @backstage/plugin-home@0.4.24
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-stack-overflow-backend@0.1.4

### Patch Changes

- ea5631a8b2: Added API key as separate configuration.

## @backstage/plugin-tech-insights@0.2.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-tech-insights-common@0.2.6

## @backstage/plugin-tech-insights-backend@0.5.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-tech-insights-common@0.2.6
  - @backstage/plugin-tech-insights-node@0.3.3

## @backstage/plugin-tech-insights-backend-module-jsonfc@0.1.19

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-tech-insights-common@0.2.6
  - @backstage/plugin-tech-insights-node@0.3.3

## @backstage/plugin-tech-insights-common@0.2.6

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.

## @backstage/plugin-tech-insights-node@0.3.3

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-tech-insights-common@0.2.6

## @backstage/plugin-tech-radar@0.5.15

### Patch Changes

- a641f79dcb: Moved CSS overflow property to quadrant block element (that is, to a div element) in `RadarLegend` component.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-techdocs@1.3.1

### Patch Changes

- e924d2d013: Added back reduction in size, fixing the large TechDocs headings.
- b86ed4d990: Added highlight to active navigation item and navigation parents.
- 7a98c73dc8: Fixed TechDocs sidebar layout bug for medium devices.
- 8acb22205c: Scrolled TechDocs navigation into focus and expanded any nested navigation items.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-techdocs-addons-test-utils@1.0.3

### Patch Changes

- Updated dependencies
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3
  - @backstage/plugin-search-react@1.0.1

## @backstage/plugin-techdocs-backend@1.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/plugin-techdocs-node@1.3.0
  - @backstage/plugin-catalog-common@1.0.5

## @backstage/plugin-techdocs-module-addons-contrib@1.0.3

### Patch Changes

- ad35364e97: Added edit button support for Bitbucket Server in techdocs.
- Updated dependencies
  - @backstage/integration@1.3.0
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/integration-react@1.1.3

## @backstage/plugin-techdocs-react@1.0.3

### Minor Changes

- 29d6cf0147: Added `toLowerEntityRefMaybe()` helper function for handling `techdocs.legacyUseCaseSensitiveTripletPaths` flag.
  Modified `entityRef` to handle `techdocs.legacyUseCaseSensitiveTripletPaths` flag in `TechDocsReaderPageContext`.

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-todo@0.2.10

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-todo-backend@0.1.32

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0

## @backstage/plugin-user-settings@0.4.7

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @backstage/plugin-vault@0.1.2

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3

## @backstage/plugin-vault-backend@0.2.1

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/backend-test-utils@0.1.27
  - @backstage/backend-tasks@0.3.4

## @backstage/plugin-xcmetrics@0.2.28

### Patch Changes

- 29f782eb37: Updated dependency `@types/luxon` to `^3.0.0`.
- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## example-app@0.2.74

### Patch Changes

- Updated dependencies
  - @backstage/plugin-kubernetes@0.7.1
  - @backstage/cli@0.18.1
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/plugin-home@0.4.24
  - @backstage/core-components@0.11.0
  - @backstage/plugin-scaffolder@1.5.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog-react@1.1.3
  - @backstage/plugin-cost-insights@0.11.30
  - @backstage/plugin-graphiql@0.2.40
  - @backstage/plugin-catalog-common@1.0.5
  - @backstage/plugin-kafka@0.3.8
  - @backstage/plugin-techdocs-module-addons-contrib@1.0.3
  - @backstage/plugin-gocd@0.1.14
  - @backstage/plugin-sentry@0.4.1
  - @backstage/plugin-api-docs@0.8.8
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/plugin-shortcuts@0.3.0
  - @backstage/plugin-tech-radar@0.5.15
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/plugin-airbrake@0.3.8
  - @backstage/plugin-apache-airflow@0.2.1
  - @backstage/plugin-azure-devops@0.1.24
  - @backstage/plugin-badges@0.2.32
  - @internal/plugin-catalog-customized@0.0.1
  - @backstage/plugin-catalog-graph@0.2.20
  - @backstage/plugin-catalog-import@0.8.11
  - @backstage/plugin-circleci@0.3.8
  - @backstage/plugin-cloudbuild@0.3.8
  - @backstage/plugin-code-coverage@0.2.1
  - @backstage/plugin-dynatrace@0.1.2
  - @backstage/plugin-explore@0.3.39
  - @backstage/plugin-gcalendar@0.3.4
  - @backstage/plugin-gcp-projects@0.3.27
  - @backstage/plugin-github-actions@0.5.8
  - @backstage/plugin-jenkins@0.7.7
  - @backstage/plugin-lighthouse@0.3.8
  - @backstage/plugin-newrelic@0.3.26
  - @backstage/plugin-newrelic-dashboard@0.2.1
  - @backstage/plugin-org@0.5.8
  - @backstage/plugin-pagerduty@0.5.1
  - @backstage/plugin-permission-react@0.4.4
  - @backstage/plugin-rollbar@0.4.8
  - @backstage/plugin-search@1.0.1
  - @backstage/plugin-search-react@1.0.1
  - @backstage/plugin-stack-overflow@0.1.4
  - @backstage/plugin-tech-insights@0.2.4
  - @backstage/plugin-todo@0.2.10
  - @backstage/plugin-user-settings@0.4.7

## example-backend@0.2.74

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-kubernetes-backend@0.7.1
  - @backstage/integration@1.3.0
  - @backstage/plugin-scaffolder-backend@1.5.0
  - @backstage/plugin-auth-backend@0.15.1
  - @backstage/plugin-graphql-backend@0.1.25
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-tech-insights-node@0.3.3
  - @backstage/plugin-catalog-backend@1.3.1
  - example-app@0.2.74
  - @backstage/plugin-app-backend@0.3.35
  - @backstage/plugin-auth-node@0.2.4
  - @backstage/plugin-azure-devops-backend@0.3.14
  - @backstage/plugin-badges-backend@0.1.29
  - @backstage/plugin-code-coverage-backend@0.2.1
  - @backstage/plugin-jenkins-backend@0.1.25
  - @backstage/plugin-kafka-backend@0.2.28
  - @backstage/plugin-permission-backend@0.5.10
  - @backstage/plugin-permission-node@0.6.4
  - @backstage/plugin-proxy-backend@0.2.29
  - @backstage/plugin-rollbar-backend@0.1.32
  - @backstage/plugin-scaffolder-backend-module-rails@0.4.3
  - @backstage/plugin-search-backend@1.0.1
  - @backstage/plugin-search-backend-module-elasticsearch@1.0.1
  - @backstage/plugin-search-backend-module-pg@0.3.6
  - @backstage/plugin-search-backend-node@1.0.1
  - @backstage/plugin-tech-insights-backend@0.5.1
  - @backstage/plugin-tech-insights-backend-module-jsonfc@0.1.19
  - @backstage/plugin-techdocs-backend@1.2.1
  - @backstage/plugin-todo-backend@0.1.32

## example-backend-next@0.0.2

### Patch Changes

- Updated dependencies
  - @backstage/plugin-scaffolder-backend@1.5.0
  - @backstage/backend-defaults@0.1.0
  - @backstage/plugin-catalog-backend@1.3.1

## techdocs-cli-embedded-app@0.2.73

### Patch Changes

- Updated dependencies
  - @backstage/cli@0.18.1
  - @backstage/plugin-techdocs@1.3.1
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-techdocs-react@1.0.3
  - @backstage/app-defaults@1.0.5
  - @backstage/core-app-api@1.0.5
  - @backstage/integration-react@1.1.3
  - @backstage/test-utils@1.1.3

## @internal/plugin-catalog-customized@0.0.1

### Patch Changes

- Updated dependencies
  - @backstage/plugin-catalog@1.5.0
  - @backstage/plugin-catalog-react@1.1.3

## @internal/plugin-todo-list@1.0.4

### Patch Changes

- Updated dependencies
  - @backstage/core-components@0.11.0
  - @backstage/core-plugin-api@1.0.5

## @internal/plugin-todo-list-backend@1.0.4

### Patch Changes

- Updated dependencies
  - @backstage/backend-common@0.15.0
  - @backstage/plugin-auth-node@0.2.4

## New Features and API Changes

### @backstage/plugin-events-backend@0.1.0

#### Minor Changes

- Introduced a new feature for custom HTTP POST body parsers to enhance flexibility in handling different content types in event-related HTTP requests.

#### API Changes

- Added `addHttpPostBodyParser` method in the events extension API to allow users to define custom parsers for different content types.

  ```typescript
  // Example usage
  eventExtensionApi.addHttpPostBodyParser('text/plain', (body) => {
    return { parsedText: body.toString() };
  });
  ```

### Behavior Changes

- `HttpPostIngressEventPublisher` now supports configurable body parsers, including default parsers like `application/json`.
- Users can add support for additional media types, such as `text/plain` or `application/x-www-form-urlencoded`.

### Testing and Validation

- Added tests to validate the new feature, covering scenarios like handling unsupported media types and verifying custom parser implementations.
- Improved request handling capabilities with robust tests.

### Documentation Updates

- Updated `plugins/events-backend/README.md` with instructions on using the new body parser feature.
- Provided a guide on implementing and utilizing custom parsers.

### Purpose and Impact

- These changes provide a flexible and robust system for handling various content types in HTTP POST requests within the events system, improving the robustness and flexibility of event handling in Backstage plugins.

### Visual Aids and Examples

- Included code snippets and examples to demonstrate new features and changes.
- Use diagrams or flowcharts where necessary to illustrate complex interactions or configurations.

### Review and Quality Assurance

- Ensured technical accuracy and clarity in the updated documentation.
- Confirmed comprehensive coverage of all new features and changes for ease of understanding by both new and existing users.
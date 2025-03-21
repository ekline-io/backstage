# Release v1.5.0

## General Summary

### New Features

- **Lifecycle Hooks and Middleware Enhancements**: 
  - Introduced lifecycle hooks like `addBeforeShutdownHook` in `@backstage/backend-app-api` and `@backstage/backend-defaults`, providing enhanced control over the backend shutdown sequence.
  - Added new lifecycle middleware to manage HTTP server lifecycle events.

### API and Behavioral Changes

- **Bitbucket Server API Client**:
  - Implemented API throttling in `@backstage/plugin-catalog-backend-module-bitbucket-server` to manage rate limits.
  
- **Notifications Backend**:
  - Endpoint paths changed from root `/` to `/notifications`. The `/health` endpoint was removed.

### Breaking Changes

- **Notifications Backend**:
  - The `/health` endpoint is no longer available. Users should transition to the new `/notifications` endpoints in their configurations.

### Deprecations

- The notifications-backend will deprecate root endpoints. Users should update their configurations to use the new `/notifications` endpoints.

## @backstage/backend-app-api@0.2.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`. The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.
- Introduced lifecycle management hooks for handling `beforeShutdown` events, enhancing the control over backend shutdown processes.

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- Updated dependencies:
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/backend-defaults@0.1.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`. The `backend-app-api` package now export the createSpecializedBacked that doesn't add any service factories by default.
- Added new lifecycle middleware to manage HTTP server lifecycle events.

### Patch Changes

- Updated dependencies:
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/plugin-catalog-backend-module-bitbucket-server@0.1.0

### Minor Changes

- f7607f9d85: Add new plugin catalog-backend-module-bitbucket-server which adds the `BitbucketServerEntityProvider`. The entity provider replaces the `BitbucketDiscoveryProcessor` for use with Bitbucket Server (Bitbucket Cloud already has a replacement).
- Implemented API throttling for Bitbucket Server API client to manage rate limits.

### Patch Changes

- Updated dependencies:
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-notifications-backend

### Minor Changes

- Restructured endpoint paths to `/notifications`, deprecating root endpoints.
  
### Breaking Changes

- Removed the `/health` endpoint. Transition to using the new `/notifications` endpoints.

## Documentation Updates

- Updated **backend-system/core-services/root-http-router.md** to include new configurations for lifecycle management, detailing how users can configure these options in their `app-config.yaml`.
- Updated **notifications/index.md** to reflect the new endpoint paths in example commands.

## Updated Dependencies

Ensure the "Updated dependencies" sections of each package reflect the newly introduced or updated packages and their respective versions. 

This updated changelog provides a comprehensive overview of the new features, enhancements, breaking changes, and deprecations introduced in Backstage release v1.5.0, guiding users to transition and leverage the new capabilities.# Release v1.5.0

## General Summary

### New Features

- **Lifecycle Hooks and Middleware Enhancements**: 
  - Introduced lifecycle hooks like `addBeforeShutdownHook` in `@backstage/backend-app-api` and `@backstage/backend-defaults`, providing enhanced control over the backend shutdown sequence.
  - Added new lifecycle middleware to manage HTTP server lifecycle events.

### API and Behavioral Changes

- **Bitbucket Server API Client**:
  - Implemented API throttling in `@backstage/plugin-catalog-backend-module-bitbucket-server` to manage rate limits.
  
- **Notifications Backend**:
  - Endpoint paths changed from root `/` to `/notifications`. The `/health` endpoint was removed.

### Breaking Changes

- **Notifications Backend**:
  - The `/health` endpoint is no longer available. Users should transition to the new `/notifications` endpoints in their configurations.

### Deprecations

- The notifications-backend will deprecate root endpoints. Users should update their configurations to use the new `/notifications` endpoints.

## @backstage/backend-app-api@0.2.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`. The `backend-app-api` package now exports the `createSpecializedBacked` that doesn't add any service factories by default.
- Introduced lifecycle management hooks for handling `beforeShutdown` events, enhancing the control over backend shutdown processes.

### Patch Changes

- 0599732ec0: Refactored experimental backend system with new type names.
- Updated dependencies:
  - @backstage/backend-common@0.15.0
  - @backstage/backend-plugin-api@0.1.1
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-permission-node@0.6.4

## @backstage/backend-defaults@0.1.0

### Minor Changes

- 5df230d48c: Introduced a new `backend-defaults` package carrying `createBackend` which was previously exported from `backend-app-api`. The `backend-app-api` package now export the createSpecializedBacked that doesn't add any service factories by default.
- Added new lifecycle middleware to manage HTTP server lifecycle events.

### Patch Changes

- Updated dependencies:
  - @backstage/backend-app-api@0.2.0
  - @backstage/backend-plugin-api@0.1.1

## @backstage/plugin-catalog-backend-module-bitbucket-server@0.1.0

### Minor Changes

- f7607f9d85: Add new plugin catalog-backend-module-bitbucket-server which adds the `BitbucketServerEntityProvider`. The entity provider replaces the `BitbucketDiscoveryProcessor` for use with Bitbucket Server (Bitbucket Cloud already has a replacement).
- Implemented API throttling for Bitbucket Server API client to manage rate limits.

### Patch Changes

- Updated dependencies:
  - @backstage/backend-common@0.15.0
  - @backstage/integration@1.3.0
  - @backstage/backend-tasks@0.3.4
  - @backstage/plugin-catalog-backend@1.3.1

## @backstage/plugin-notifications-backend

### Minor Changes

- Restructured endpoint paths to `/notifications`, deprecating root endpoints.
  
### Breaking Changes

- Removed the `/health` endpoint. Transition to using the new `/notifications` endpoints.

## Documentation Updates

- Updated **backend-system/core-services/root-http-router.md** to include new configurations for lifecycle management, detailing how users can configure these options in their `app-config.yaml`.
- Updated **notifications/index.md** to reflect the new endpoint paths in example commands.

## Updated Dependencies

Ensure the "Updated dependencies" sections of each package reflect the newly introduced or updated packages and their respective versions. 

This updated changelog provides a comprehensive overview of the new features, enhancements, breaking changes, and deprecations introduced in Backstage release v1.5.0, guiding users to transition and leverage the new capabilities.
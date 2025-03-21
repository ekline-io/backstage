---

id: url-reader
title: Url Reader Service
sidebar_label: Url Reader
description: Documentation for the Url Reader service

---

# URL Readers

Plugins require communication with certain integrations that users configure. Popular integrations are things like Version Control Systems (VSC), such as GitHub, BitBucket, GitLab, etc. Users configure these integrations in the `integrations` section of the `app-config.yaml` file.

These URL readers essentially wrap authentication for files and folders that these VCS repositories could store.

## Using the service

The following example shows how to get the URL Reader service in your `example` backend plugin to read a file and a directory from a GitHub repository.

```ts
import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import os from 'os';

createBackendPlugin({
  pluginId: 'example',
  register(env) {
    env.registerInit({
      deps: {
        urlReader: coreServices.urlReader,
      },
      async init({ urlReader }) {
        const buffer = await urlReader
          .read('https://github.com/backstage/backstage/blob/master/README.md')
          .then(r => r.buffer());

        const tmpDir = os.tmpdir();
        const directory = await urlReader
          .readTree(
            'https://github.com/backstage/backstage/tree/master/packages/backend',
          )
          .then(tree => tree.dir({ targetDir: tmpDir }));
      },
    });
  },
});
```

## Providing custom URL readers

You can also create an internal or bespoke reader and provide it to the backend using a service factory. The following example shows how to create a custom URL reader and provide it to the backend.

```ts title="packages/backend/src/index.ts"
import { createBackend } from '@backstage/backend-defaults';
import {
  ReaderFactory,
  urlReaderFactoriesServiceRef,
} from '@backstage/backend-defaults/urlReader';
import {
  createServiceFactory,
  UrlReaderService,
} from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';

class CustomUrlReader implements UrlReaderService {
  static factory: ReaderFactory = ({ config, treeResponseFactory }) => {
    const reader = new CustomUrlReader(config);
    const predicate = (url: URL) => url.host === 'myCustomDomain';
    return [{ reader, predicate }];
  };

  constructor(private readonly config: Config) {}
  // implementations of read, readTree and search methods skipped for this example
}

const customReader = createServiceFactory({
  service: urlReaderFactoriesServiceRef,
  deps: {},
  async factory() {
    return CustomUrlReader.factory;
  },
});

const backend = createBackend();
// backend.add() of other plugins and modules excluded
backend.add(customReader);
```

## Writing URL Readers

We want to make sure all URL Readers behave in the same way. Hence if possible, implement all the methods of the `UrlReaderService` interface. However, it's okay to start by implementing just one of them and creating issues for the remaining ones.

You can choose to make new URL Readers open source if the use case is beneficial to other users. Either as its own package or by updating the [`default` factory](https://github.com/backstage/backstage/blob/ce2ca68f07ad3334401d3277b989bf145b728a64/packages/backend-defaults/src/entrypoints/urlReader/lib/UrlReaders.ts#L82-L102) method of URL Readers. It's recommended to create an issue in the Backstage repository to discuss the use case and get feedback before starting the implementation of a new core URL Reader.

Here are some general guidelines for writing URL Readers:

#### `readUrl`

`readUrl` method expects a user-friendly URL, something that a person can copy from the browser when browsing the provider in their browser.

- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/ADOPTERS.md`
- ❌ Not a valid URL: `https://raw.githubusercontent.com/backstage/backstage/master/ADOPTERS.md`
- ❌ Not a valid URL: `https://github.com/backstage/backstage/ADOPTERS.md`

Upon receiving the URL, `readUrl` converts the user-friendly URL into an API URL which can request the provider's API.

`readUrl` then makes an authenticated request to the provider API and returns the response containing the file's contents and `ETag` (if the provider supports it).

#### `readTree`

`readTree` method also expects user-friendly URLs similar to `read` but the URL should point to a tree (could be the root of a repository or even a sub-directory).

- ✅ Valid URL: `https://github.com/backstage/backstage`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/docs`

Using the provider's API documentation, find an API endpoint which you can use to download either a zip or a tarball. You can download the entire tree (for example, a repository) and filter out in case the user is expecting only a sub-tree. But some APIs are smart enough to accept a path and return only a sub-tree in the downloaded archive.

#### `search`

`search` method expects a glob pattern of a URL and returns a list of files matching the query.

- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/**/catalog-info.yaml`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/**/*.md`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/*/package.json`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/README`

The core logic of `readTree` can extract all the files inside the tree and return the files matching the pattern in the `url`.

### Caching

All of the methods above support ETag-based caching. If you call the method without an ETag, the response contains the ETag of the resource (should ideally forward the ETag returned by the provider). If you call the method with an ETag, it first compares the ETag and returns a `NotModifiedError` in case the resource hasn't been modified. This approach is similar to the actual [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) and [`If-None-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match) HTTP headers.

## Configuration Guide for Event Bus Polling Timeout

### Setting Up `notifyTimeoutMs`

The `notifyTimeoutMs` setting allows you to configure the event bus polling timeout, enhancing the system's robustness by defining how long the system should wait for notifications before timing out.

#### Configuration

To configure the `notifyTimeoutMs`, add the following section to your `app-config.yaml` file:

```yaml
events:
  notifyTimeoutMs: 30000 # Timeout in milliseconds
```

- **Purpose:** This setting defines the maximum waiting period for event notifications. A longer timeout may be necessary for systems with slower event processing.

- **Default Behavior:** If `notifyTimeoutMs` isn't configured, the system uses a default timeout value to balance responsiveness and performance.

## API Documentation Updates

### `EVENTS_NOTIFY_TIMEOUT_HEADER`

The `EVENTS_NOTIFY_TIMEOUT_HEADER` manages polling timeouts between the backend and node services.

- **Usage:** This header specifies the timeout for notification polling, allowing both backend and node services to handle timeouts efficiently.

### Changes in Event Management

The API now includes enhanced timeout management for event handling, ensuring that the system is responsive and can recover from potential delays.

## Release Notes

### New Features and Enhancements

- **Configurable Timeout Feature:** Introduced `notifyTimeoutMs` to enhance event handling capabilities. This feature allows users to define custom timeouts for event notifications, improving system reliability.

- **Backward Compatibility:** The new timeout feature is backward compatible. However, we encourage users to review their configurations to take advantage of the new settings.

## Testing the Timeout Feature

### Testing Scenarios

To verify the new timeout behavior, consider the following testing scenarios, as updated in `DefaultEventsService.test.ts`:

- **Configuration Testing:** Ensure that the `notifyTimeoutMs` setting is correctly applied and that the system waits for the configured duration before timing out.

- **Performance Testing:** Evaluate how different timeout values affect system performance and responsiveness under varying loads.

By following these updates, users, and developers can utilize the new features introduced in the recent changes, ensuring an improved experience with the URL Reader service and the event handling capabilities of the system.---

id: url-reader
title: Url Reader Service
sidebar_label: Url Reader
description: Documentation for the Url Reader service

---

# URL Readers

Plugins require communication with certain integrations that users configure. Popular integrations are things like Version Control Systems (VSC), such as GitHub, BitBucket, GitLab, etc. Users configure these integrations in the `integrations` section of the `app-config.yaml` file.

These URL readers essentially wrap authentication for files and folders that these VCS repositories could store.

## Using the service

The following example shows how to get the URL Reader service in your `example` backend plugin to read a file and a directory from a GitHub repository.

```ts
import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import os from 'os';

createBackendPlugin({
  pluginId: 'example',
  register(env) {
    env.registerInit({
      deps: {
        urlReader: coreServices.urlReader,
      },
      async init({ urlReader }) {
        const buffer = await urlReader
          .read('https://github.com/backstage/backstage/blob/master/README.md')
          .then(r => r.buffer());

        const tmpDir = os.tmpdir();
        const directory = await urlReader
          .readTree(
            'https://github.com/backstage/backstage/tree/master/packages/backend',
          )
          .then(tree => tree.dir({ targetDir: tmpDir }));
      },
    });
  },
});
```

## Providing custom URL readers

You can also create an internal or bespoke reader and provide it to the backend using a service factory. The following example shows how to create a custom URL reader and provide it to the backend.

```ts title="packages/backend/src/index.ts"
import { createBackend } from '@backstage/backend-defaults';
import {
  ReaderFactory,
  urlReaderFactoriesServiceRef,
} from '@backstage/backend-defaults/urlReader';
import {
  createServiceFactory,
  UrlReaderService,
} from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';

class CustomUrlReader implements UrlReaderService {
  static factory: ReaderFactory = ({ config, treeResponseFactory }) => {
    const reader = new CustomUrlReader(config);
    const predicate = (url: URL) => url.host === 'myCustomDomain';
    return [{ reader, predicate }];
  };

  constructor(private readonly config: Config) {}
  // implementations of read, readTree and search methods skipped for this example
}

const customReader = createServiceFactory({
  service: urlReaderFactoriesServiceRef,
  deps: {},
  async factory() {
    return CustomUrlReader.factory;
  },
});

const backend = createBackend();
// backend.add() of other plugins and modules excluded
backend.add(customReader);
```

## Writing URL Readers

We want to make sure all URL Readers behave in the same way. Hence if possible, implement all the methods of the `UrlReaderService` interface. However, it's okay to start by implementing just one of them and creating issues for the remaining ones.

You can choose to make new URL Readers open source if the use case is beneficial to other users. Either as its own package or by updating the [`default` factory](https://github.com/backstage/backstage/blob/ce2ca68f07ad3334401d3277b989bf145b728a64/packages/backend-defaults/src/entrypoints/urlReader/lib/UrlReaders.ts#L82-L102) method of URL Readers. It's recommended to create an issue in the Backstage repository to discuss the use case and get feedback before starting the implementation of a new core URL Reader.

Here are some general guidelines for writing URL Readers:

#### `readUrl`

`readUrl` method expects a user-friendly URL, something that a person can copy from the browser when browsing the provider in their browser.

- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/ADOPTERS.md`
- ❌ Not a valid URL: `https://raw.githubusercontent.com/backstage/backstage/master/ADOPTERS.md`
- ❌ Not a valid URL: `https://github.com/backstage/backstage/ADOPTERS.md`

Upon receiving the URL, `readUrl` converts the user-friendly URL into an API URL which can request the provider's API.

`readUrl` then makes an authenticated request to the provider API and returns the response containing the file's contents and `ETag` (if the provider supports it).

#### `readTree`

`readTree` method also expects user-friendly URLs similar to `read` but the URL should point to a tree (could be the root of a repository or even a sub-directory).

- ✅ Valid URL: `https://github.com/backstage/backstage`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/docs`

Using the provider's API documentation, find an API endpoint which you can use to download either a zip or a tarball. You can download the entire tree (for example, a repository) and filter out in case the user is expecting only a sub-tree. But some APIs are smart enough to accept a path and return only a sub-tree in the downloaded archive.

#### `search`

`search` method expects a glob pattern of a URL and returns a list of files matching the query.

- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/**/catalog-info.yaml`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/**/*.md`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/*/package.json`
- ✅ Valid URL: `https://github.com/backstage/backstage/blob/master/README`

The core logic of `readTree` can extract all the files inside the tree and return the files matching the pattern in the `url`.

### Caching

All of the methods above support ETag-based caching. If you call the method without an ETag, the response contains the ETag of the resource (should ideally forward the ETag returned by the provider). If you call the method with an ETag, it first compares the ETag and returns a `NotModifiedError` in case the resource hasn't been modified. This approach is similar to the actual [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) and [`If-None-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match) HTTP headers.

## Configuration Guide for Event Bus Polling Timeout

### Setting Up `notifyTimeoutMs`

The `notifyTimeoutMs` setting allows you to configure the event bus polling timeout, enhancing the system's robustness by defining how long the system should wait for notifications before timing out.

#### Configuration

To configure the `notifyTimeoutMs`, add the following section to your `app-config.yaml` file:

```yaml
events:
  notifyTimeoutMs: 30000 # Timeout in milliseconds
```

- **Purpose:** This setting defines the maximum waiting period for event notifications. A longer timeout may be necessary for systems with slower event processing.

- **Default Behavior:** If `notifyTimeoutMs` isn't configured, the system uses a default timeout value to balance responsiveness and performance.

## API Documentation Updates

### `EVENTS_NOTIFY_TIMEOUT_HEADER`

The `EVENTS_NOTIFY_TIMEOUT_HEADER` manages polling timeouts between the backend and node services.

- **Usage:** This header specifies the timeout for notification polling, allowing both backend and node services to handle timeouts efficiently.

### Changes in Event Management

The API now includes enhanced timeout management for event handling, ensuring that the system is responsive and can recover from potential delays.

## Release Notes

### New Features and Enhancements

- **Configurable Timeout Feature:** Introduced `notifyTimeoutMs` to enhance event handling capabilities. This feature allows users to define custom timeouts for event notifications, improving system reliability.

- **Backward Compatibility:** The new timeout feature is backward compatible. However, we encourage users to review their configurations to take advantage of the new settings.

## Testing the Timeout Feature

### Testing Scenarios

To verify the new timeout behavior, consider the following testing scenarios, as updated in `DefaultEventsService.test.ts`:

- **Configuration Testing:** Ensure that the `notifyTimeoutMs` setting is correctly applied and that the system waits for the configured duration before timing out.

- **Performance Testing:** Evaluate how different timeout values affect system performance and responsiveness under varying loads.

By following these updates, users, and developers can utilize the new features introduced in the recent changes, ensuring an improved experience with the URL Reader service and the event handling capabilities of the system.
import { Readable } from 'stream';

/**
 * A generic interface for fetching plain data from URLs, now integrated with enhanced event bus features.
 *
 * See the {@link https://backstage.io/docs/backend-system/core-services/url-reader | service documentation} for more details.
 *
 * @public
 */
export interface UrlReaderService {
  /**
   * Reads a single file and return its content. Now includes timeout handling for enhanced performance.
   *
   * @param url - The URL of the file to read.
   * @param options - Optional parameters including authentication tokens and timeout settings.
   * @returns A promise that resolves with the file content.
   */
  readUrl(
    url: string,
    options?: UrlReaderServiceReadUrlOptions,
  ): Promise<UrlReaderServiceReadUrlResponse>;

  /**
   * Reads a full or partial file tree with optional timeout configurations.
   *
   * @param url - The URL of the file tree to read.
   * @param options - Optional parameters including filtering, authentication, and timeout settings.
   * @returns A promise that resolves with the file tree content.
   */
  readTree(
    url: string,
    options?: UrlReaderServiceReadTreeOptions,
  ): Promise<UrlReaderServiceReadTreeResponse>;

  /**
   * Searches for a file in a tree using a glob pattern, with configurable timeout settings.
   *
   * @param url - The base URL to search within.
   * @param options - Optional parameters including authentication and timeout settings.
   * @returns A promise that resolves with the search results.
   */
  search(
    url: string,
    options?: UrlReaderServiceSearchOptions,
  ): Promise<UrlReaderServiceSearchResponse>;
}

/**
 * An options object for readUrl operations, now supporting timeout configurations.
 *
 * @public
 */
export type UrlReaderServiceReadUrlOptions = {
  etag?: string;
  lastModifiedAfter?: Date;
  signal?: AbortSignal;
  token?: string;

  /**
   * Timeout for URL reading operations, in milliseconds.
   *
   * @remarks
   *
   * This parameter allows you to specify the duration after which the read operation should abort if not completed.
   * It defaults to 55 seconds if not specified, aligning with the event bus polling timeout setting.
   */
  notifyTimeoutMs?: number;
};

/**
 * A response object for {@link UrlReaderService.readUrl} operations.
 *
 * @public
 */
export type UrlReaderServiceReadUrlResponse = {
  buffer(): Promise<Buffer>;
  stream?(): Readable;
  etag?: string;
  lastModifiedAt?: Date;
};

/**
 * An options object for {@link UrlReaderService.readTree} operations with timeout support.
 *
 * @public
 */
export type UrlReaderServiceReadTreeOptions = {
  filter?(path: string, info?: { size: number }): boolean;
  etag?: string;
  signal?: AbortSignal;
  token?: string;

  /**
   * Timeout for tree reading operations, in milliseconds.
   *
   * @remarks
   *
   * Controls how long the operation should take before timing out, enhancing integration with event bus features.
   */
  notifyTimeoutMs?: number;
};

/**
 * Options that control {@link UrlReaderServiceReadTreeResponse.dir} execution.
 *
 * @public
 */
export type UrlReaderServiceReadTreeResponseDirOptions = {
  targetDir?: string;
};

/**
 * A response object for {@link UrlReaderService.readTree} operations.
 *
 * @public
 */
export type UrlReaderServiceReadTreeResponse = {
  files(): Promise<UrlReaderServiceReadTreeResponseFile[]>;
  archive(): Promise<NodeJS.ReadableStream>;
  dir(options?: UrlReaderServiceReadTreeResponseDirOptions): Promise<string>;
  etag: string;
};

/**
 * Represents a single file in a {@link UrlReaderService.readTree} response.
 *
 * @public
 */
export type UrlReaderServiceReadTreeResponseFile = {
  path: string;
  content(): Promise<Buffer>;
  lastModifiedAt?: Date;
};

/**
 * An options object for search operations, now with configurable timeout settings.
 *
 * @public
 */
export type UrlReaderServiceSearchOptions = {
  etag?: string;
  signal?: AbortSignal;
  token?: string;

  /**
   * Timeout for search operations, in milliseconds.
   *
   * @remarks
   *
   * Allows control over the duration before a search operation times out, facilitating smoother integration with event systems.
   */
  notifyTimeoutMs?: number;
};

/**
 * The output of a search operation.
 *
 * @public
 */
export type UrlReaderServiceSearchResponse = {
  files: UrlReaderServiceSearchResponseFile[];
  etag: string;
};

/**
 * Represents a single file in a search response.
 *
 * @public
 */
export type UrlReaderServiceSearchResponseFile = {
  url: string;
  content(): Promise<Buffer>;
  lastModifiedAt?: Date;
};

/**
 * Constant for handling timeout headers in event responses.
 *
 * @public
 */
export const EVENTS_NOTIFY_TIMEOUT_HEADER = 'X-Event-Notify-Timeout';
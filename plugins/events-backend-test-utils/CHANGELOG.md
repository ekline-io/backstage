# @backstage/plugin-events-backend-test-utils

## Custom HTTP Body Parsing

### Overview

The `@backstage/plugin-events-backend` now allows for the customization of HTTP body parsers to handle a variety of content types when processing HTTP POST requests. This feature enhances flexibility by enabling the handling of content types beyond the default `application/json`.

### Default Behavior

By default, the plugin processes HTTP POST requests with media type application/json. The HttpApplicationJsonBodyParser facilitates this default behavior.

### Adding Custom HTTP Body Parsers

You can define and register custom body parsers to process different content types, such as XML or binary data, using the `addHttpPostBodyParser` method in the `EventsPlugin`.

#### Steps to Add a Custom Body Parser

1. **Define a Custom Parser:**

   Create a new parser by implementing the `HttpBodyParser` interface. Define the logic to parse the specific media type you want to handle.

   ```typescript
   import { HttpBodyParser, HttpBodyParserOptions } from '@backstage/plugin-events-node';

   const customXmlBodyParser: HttpBodyParser = {
     type: 'application/xml',
     parse: async (body: Buffer, options: HttpBodyParserOptions) => {
       // Logic to parse XML content
       const xmlContent = /* parse XML from body */;
       return xmlContent;
     },
   };
   ```

2. **Register the Custom Parser:**

   Use the `addHttpPostBodyParser` method to register your custom parser with the `EventsPlugin`.

   ```typescript
   import { createRouter } from '@backstage/plugin-events-backend';

   const router = await createRouter({
     logger,
     config,
   });

   router.addHttpPostBodyParser(customXmlBodyParser);
   ```

3. **Benefits of Custom Parsers:**

   - **Flexibility**: Handle various content types tailored to your needs.
   - **Compatibility**: Extend the plugin to support legacy systems or unique data formats.
   - **Error Handling**: Customize error responses for unsupported content types.

### API Documentation

#### New Classes and Methods

- **HttpBodyParser**: Interface for defining custom body parsers.
- **HttpApplicationJsonBodyParser**: Default parser for `application/json`.
- **HttpBodyParserOptions**: Options available for parsing HTTP bodies.

#### Method Descriptions

- **addHttpPostBodyParser**: Registers a custom HTTP body parser with the `EventsPlugin`. Use this method to enhance the plugin's ability to process different content types.

### Testing Custom Parsers

It is essential to test your custom body parsers to ensure they function correctly under various scenarios. The `HttpPostIngressEventPublisher.test.ts` file provides examples of testing different content types and managing unsupported media types.

#### Writing Tests for Custom Parsers

1. **Test Different Content Types**: Verify that your custom parser can accurately process the expected input and produce the correct output.

2. **Handle Unsupported Media Types**: Ensure that the system handles unsupported content types and provides informative error messages.

3. **Use Test Utilities**: Leverage utilities provided in the `plugin-events-backend-test-utils` to streamline writing and executing tests for your custom parsers.

By incorporating these updates and guidelines, users can leverage the new HTTP body parsing capabilities, enhancing their `@backstage/plugin-events-backend` implementations to meet diverse app requirements.
import createNextIntlPlugin from "next-intl/plugin"

/**
 * Application internationalization configuration object
 *
 * **Parameters**
 * - `requestConfig` - Path to the request configuration file
 * - `experimental` - Experimental configuration options
 *    - `createMessagesDeclaration` - One or more paths to message files
 *    - `messages` - Configuration for message catalogs
 *
 * **Usage**
 * ```ts
 * // Import the translation plugin
 * import { withTranslation } from "@polyplate/translation/plugin"
 *
 * // Define your framework configuration object
 * const nextConfig: NextConfig = {}
 *
 * // Wrap the framework configuration with translation support
 * export default withTranslation(nextConfig)
 * ```
 */
export const withTranslation = createNextIntlPlugin({
  // Path to the request configuration file
  requestConfig : '../../packages/translation/src/translation/request.ts',

  // Experimental configuration options
  experimental  : {
    // A path to the messages file that you'd like to create a declaration for. In case you want to consider multiple files, you can pass an array of paths
    // createMessagesDeclaration   : ["../../packages/translation/src/messages/tr.json", "../../packages/translation/src/messages/en.json"],
    // Configuration about your catalogs of messages, to be used in combination with `srcPath` and `extract`
    messages                    : {
      // Relative path to the directory containing your messages
      path    : '../../packages/translation/src/messages',

      // Defines the format for how your messages are stored
      format  : 'json',

      // Either automatically infer the locales based on catalog files in `path` or explicitly define them
      locales : 'infer'
    }
  }
})

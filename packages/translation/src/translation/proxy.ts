import createMiddleware from "next-intl/middleware"

import { routing } from "./routing"

/**
 * Proxy / middleware for internationalization in application
 *
 * **Parameters**
 * - `routing` - The routing configuration object
 *
 * **Usage**
 * ```ts
 * // Import the translation proxy / middleware
 * import { translationProxy } from "@polyplate/translation/proxy"
 *
 * // Wrap the proxy / middleware in your server-side entrypoint
 * export default translationProxy
 * ```
 */
export const translationProxy =
  createMiddleware(routing)

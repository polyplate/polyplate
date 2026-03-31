import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"

const APP_LOCALES = [
  "en"
]

/**
 * Returns the request configuration for server components
 *
 * **Parameters**
 * - `requestLocale` — Promise resolving to the locale string detected from the request
 *
 * **Usage**
 * ```tsx
 * // Import the translation plugin
 * import requestConfig from "@polyplate/translation/request"
 *
 * // Define your framework configuration object
 * const nextConfig: NextConfig = {}
 *
 * // Wrap the framework configuration with translation support
 * export default withTranslation(nextConfig)
 * ```
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Resolve the locale candidate from the incoming request (Promise<string | undefined>)
  const candidate = await requestLocale

  // Retrieve the cookie store (only available on the server)
  const store = await cookies()

  // Attempt to read the "obvia_user_language" cookie value
  const cookieLocale = store.get('polyplate_user_language')?.value

  // Ensure the resolved locale is always a valid string
  const resolvedLocale =
    (candidate && APP_LOCALES.includes(candidate) ? candidate : undefined) ??
    (cookieLocale && APP_LOCALES.includes(cookieLocale) ? cookieLocale : undefined) ??
    "en"

  // Dynamically import the translation file for the resolved locale
  const messages = await import(`../messages/${resolvedLocale}.json`)

  // Return the configuration object used by next-intl
  return {
    // Valid unicode locale tag (e.g. "en", "tr", "en-GB")
    locale: resolvedLocale,

    // Translation messages available for this locale
    messages: messages.default
  }
})

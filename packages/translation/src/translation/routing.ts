import { defineRouting } from "next-intl/routing"

/**
 * Defines routing configuration for internationalization
 *
 * **Parameters**
 * - `locales` — List of all supported locales
 * - `defaultLocale` — Locale to fall back to when no match is found
 * - `localePrefix` — Defines how locale prefixes appear in URLs
 * - `localeCookie` — Cookie used to persist user locale preference
 * - `localeDetection` — Locale detection via cookies and the headers
 *
 * **Usage**
 * ```tsx
 * // Import the translation routing configuration
 * import { routing } from "@polyplate/translation/routing"
 *
 * // Create navigation helpers bound to the routing config
 * const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
 *
 * // Use the routing config with middleware to enable locale-aware routing
 * const translationProxy = createMiddleware(routing)
 * ```
 */
export const routing = defineRouting({
  // Supported locales
  locales         : ["en"],

  // Fallback locale when no match is found
  defaultLocale   : "en",

  // Controls how locale prefixes appear in URLs
  localePrefix    : 'as-needed',

  // Custom cookie configuration for storing user locale
  localeCookie    : {
    // Cookie name
    name      : 'polyplate_user_language',
    // Restricts cross-site cookie sharing to top-level navigations. Helps prevent CSRF while allowing basic link-based flows
    sameSite  : "lax",
    // Makes the cookie available across the entire site.
    path      : "/",
    // Limits the cookie to a specific domain (e.g. "polyplate.io")
    domain  : process.env.VERCEL_ENV === 'production' ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` :`.polyplate.dev`,
    // Sends the cookie only over HTTPS in production. Prevents leakage over insecure connections
    secure    : true,
    // Expiration time: one year
    maxAge  : 60 * 60 * 24 * 365,
  },

  // Enable automatic locale detection (cookies + Accept-Language header)
  localeDetection : true
})

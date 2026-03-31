import { createNavigation } from "next-intl/navigation"

import { routing } from "./routing"

// Create navigation helpers object
const navigation = createNavigation(routing)

/**
 * Locale‑aware link component for internationalized routing
 *
 * **Props**
 * - `*` - Accepts all standard next.js Link props, plus `locale` for language override
 *
 * **Usage**
 * ```tsx
 * // Import the translation plugin
 * import { Link } from "@polyplate/translation/navigation"
 *
 * // When the user is on `/en`, the link will point to `/en/about`
 * <Link href="/about">About</Link>
 *
 * // Search params can be added via `query`
 * <Link href={{ pathname: "/users", query: { sortBy: 'name' } }}>Users</Link>
 *
 * // You can override the `locale` to switch to another language
 * <Link href="/" locale="de">Switch to German</Link>
 * ```
 */
export const Link = navigation.Link

/**
 * Get the current pathname (server‑side)
 *
 * **Usage**
 * ```tsx
 * // Import the server-side pathname hook
 * import { getPathname } from "@polyplate/translation/navigation"
 *
 * // Use the pathname in your routes
 * export async function polyplate(request: Request) {
 *   // Get the current pathname from the router
 *   const pathname = getPathname()
 *
 *   // Render the current pathname somewhere in your app
 *   return (<p>Current path: {pathname}</p>)
 * }
 * ```
 */
export const getPathname = navigation.getPathname

/**
 * Get the current pathname (client‑side)
 *
 * **Usage**
 * ```tsx
 * // Import the client-side pathname hook
 * import { usePathname } from "@polyplate/translation/navigation"
 *
 * // Use the pathname in your components
 * export default function Polyplate() {
 *   // Get the current pathname from the router
 *   const pathname = usePathname()
 *
 *   // Render the current pathname somewhere in your app
 *   return (<p>Current path: {pathname}</p>)
 * }
 * ```
 */
export const usePathname = navigation.usePathname

/**
 * Hook to access the router with locale‑aware navigation
 *
 * **Usage**
 * ```tsx
 * // Import the router hook
 * import { useRouter } from "@polyplate/translation/navigation"
 *
 * // Use the router in your components or pages
 * export default function Polyplate() {
 *   const router = useRouter()
 *
 *   // Navigate to a locale-aware route
 *   router.push("/settings")
 *
 *   // Replace current route without adding to history
 *   router.replace("/dashboard")
 *
 *   // Prefetch a page for faster navigation
 *   router.prefetch("/about")
 * }
 * ```
 */
export const useRouter = navigation.useRouter

/**
 * Redirect to a locale‑aware route (temporary)
 *
 * **Parameters**
 * - `href` — Target path or URL to redirect to
 *
 * **Usage**
 * ```ts
 * // Import the redirect function
 * import { redirect } from "@polyplate/translation/navigation"
 *
 * // Temporarily redirect to the dashboard
 * redirect("/dashboard")
 * ```
 */
export const redirect = navigation.redirect

/**
 * Permanently redirect to a locale‑aware route
 *
 * **Parameters**
 * - `href` — Target path or URL to redirect to
 *
 * **Usage**
 * ```ts
 * // Import the permament redirect function
 * import { permanentRedirect } from "@polyplate/translation/navigation"
 *
 * // Permanently redirect to the homepage in English
 * permanentRedirect("/", { locale: "en" })
 * ```
 */
export const permanentRedirect = navigation.permanentRedirect

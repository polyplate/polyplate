import {
  type NextFetchEvent,
  type NextRequest
} from "next/server"

import { resolveProxy } from "@library/proxy/utility"
import { parseProxy } from "@obvia/utilities/next"

/** Proxy configuration */
export const config = {
  /**
   * Path matcher configuration
   *
   * **Paths**
   * - `/api/*` → exclude server endpoints
   * - `/_next/*` → exclude next.js internals
   * - `/_proxy/*` → exclude third‑party paths
   * - `favicon.ico` → exclude favicon
   * - `sitemap.xml` → exclude sitemap
   * - `robots.txt` → exclude robots file
   */
  matcher : ["/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)"]
}

/**
 * Root middleware for handling all incoming requests
 *
 * **Parameters**
 * - `request` — Next.js incoming request object (used for request inspection and manipulation)
 * - `event` — Next.js fetch event (used for background tasks and async handling)
 *
 * **Usage**
 * ```ts
 * export async function polyplateProxy(request, event, context) {
 *   // Internally rewrite the request to serve content from `/polyplate.io${fullPath}`
 *   return NextResponse.rewrite(new URL(`/polyplate.io${fullPath}`, request.url))
 * }
 * ```
 */
export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  // Parse the incoming request to extract host, path, and subdomain information
  const context = parseProxy(request)

  // Resolve middleware based on parsed request metadata
  return resolveProxy(request, event, context)
}

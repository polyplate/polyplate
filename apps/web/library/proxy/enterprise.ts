import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  type RequestContext
} from "@obvia/utilities/next"

/**
 * Enterprise middleware (fallback for multi-tenant custom domains)
 *
 * **Parameter**
 * - `request` - Next.js incoming request (used for request manipulation)
 * - `event` - Next.js fetch event (used for background tasks)
 * - `context` - Parsed request context (domain, path, query, etc.)
 *
 * **Usage**
 * ```ts
 * export default async function proxy(request: NextRequest, event: NextFetchEvent) {
 *   // Parse the incoming request
 *   const context = parse(request)
 *
 *   // subdomain checks
 *
 *   // If no subdomain matches, run enterprise middleware
 *   return enterpriseProxy(request, event, context)
 * }
 * ```
 */
export async function enterpriseProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Rewrite the request internally to serve content from the app subdomain
  return NextResponse.rewrite(new URL(`/app.polyplate.io${context.fullPath}`, request.url))
}

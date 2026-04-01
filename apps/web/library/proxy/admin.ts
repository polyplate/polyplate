import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  type RequestContext
} from "@obvia/utilities/next"

/**
 * Admin middleware for handling admin subdomain requests
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
 *   // Check if the current domain exists in the admin hostnames set
 *   if (ADMIN_HOSTNAMES.has(context.domain)) {
 *     // If it matches, run the admin middleware and return immediately
 *     return adminProxy(request, event, context)
 *   }
 *
 *   // Otherwise, continue with Next.js default handling
 *   return NextResponse.next()
 * }
 * ```
 */
export async function adminProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Internally rewrite the request to serve content from admin subdomain
  return NextResponse.rewrite(new URL(`/admin.sirket.io${context.fullPath}`, request.url))
}

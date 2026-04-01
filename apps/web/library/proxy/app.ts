import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  type RequestContext
} from "@obvia/utilities/next"

/**
 * Application middleware for handling application subdomain requests
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
 *   // Check if the current domain exists in the application hostnames set
 *   if (APP_HOSTNAMES.has(context.domain)) {
 *     // If it matches, run the application middleware and return immediately
 *     return appProxy(request, event, context)
 *   }
 *
 *   // Otherwise, continue with Next.js default handling
 *   return NextResponse.next()
 * }
 * ```
 */
export async function appProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Rewrite the request internally to serve content from the app subdomain
  return NextResponse.rewrite(new URL(`/app.polyplate.io${context.fullPath}`, request.url))
}

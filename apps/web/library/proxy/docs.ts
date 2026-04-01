import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  type RequestContext
} from "@obvia/utilities/next"

/**
 * Docs middleware for handling docs subdomain requests
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
 *   // Check if the current domain exists in the docs hostnames set
 *   if (DOCS_HOSTNAMES.has(context.domain)) {
 *     // If it matches, run the docs middleware and return immediately
 *     return docsProxy(request, event, context)
 *   }
 *
 *   // Otherwise, continue with Next.js default handling
 *   return NextResponse.next()
 * }
 * ```
 */
export async function docsProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Internally rewrite the request to serve content from docs subdomain
  return NextResponse.rewrite(new URL(`/docs.polyplate.io${context.fullPath}`, request.url))
}

import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  type RequestContext
} from "@obvia/utilities/next"

/**
 * Blog middleware for handling blog subdomain requests
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
 *   // Check if the current domain exists in the blog hostnames set
 *   if (BLOG_HOSTNAMES.has(context.domain)) {
 *     // If it matches, run the blog middleware and return immediately
 *     return blogProxy(request, event, context)
 *   }
 *
 *   // Otherwise, continue with Next.js default handling
 *   return NextResponse.next()
 * }
 * ```
 */
export async function blogProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Internally rewrite the request to serve content from blog subdomain
  return NextResponse.rewrite(new URL(`/blog.polyplate.io${context.fullPath}`, request.url))
}

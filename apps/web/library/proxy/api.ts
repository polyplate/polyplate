import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse
} from "next/server"

import {
  DOMAINS,
  type RequestContext
} from "@obvia/utilities/next"

/**
 * **API** proxy for handling api subdomain requests
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
 *   // Check if the current domain exists in the api hostnames set
 *   if (API_HOSTNAMES.has(context.domain)) {
 *     // If it matches, run the api middleware and return immediately
 *     return apiProxy(request, event, context)
 *   }
 *
 *   // Otherwise, continue with Next.js default handling
 *   return NextResponse.next()
 * }
 * ```
 */
export async function apiProxy(
  request: NextRequest,
  event: NextFetchEvent,
  context: RequestContext
): Promise<NextResponse> {
  // Extract the origin header from the incoming request
  const origin = request.headers.get("origin")

  // Handle CORS preflight requests (OPTIONS method)
  if (request.method === "OPTIONS") {
    // Return an empty 204 response with CORS headers
    const response = new NextResponse(null, { status: 204 })

    // Allow only whitelisted origins
    if (origin && DOMAINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin)
    }

    // Enable credentials (cookies, authorization headers)
    response.headers.set("Access-Control-Allow-Credentials", "true")

    // Define allowed HTTP methods
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )

    // Define allowed request headers
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Sirketio-Token, X-Sirketio-Version"
    )

    return response
  }

  // For normal requests, internally rewrite to the API subdomain
  const response = NextResponse.rewrite(new URL(`/api${context.path}`, request.url))

  // Attach CORS headers for allowed origins
  if (origin && DOMAINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  // Allow credentials for normal requests
  response.headers.set("Access-Control-Allow-Credentials", "true")

  return response
}

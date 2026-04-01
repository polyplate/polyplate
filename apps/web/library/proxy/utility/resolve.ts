import type { NextFetchEvent, NextRequest } from "next/server"

import {
  adminProxy,
  apiProxy,
  appProxy,
  blogProxy,
  docsProxy,
  enterpriseProxy,
  roadmapProxy,
  statusProxy,
  webProxy,
} from "@library/proxy"

import {
  ADMIN_HOSTNAMES,
  API_HOSTNAMES,
  APP_HOSTNAMES,
  BLOG_HOSTNAMES,
  DOCS_HOSTNAMES,
  ROADMAP_HOSTNAMES,
  STATUS_HOSTNAMES,
  WEB_HOSTNAMES,
  proxyLog,
  HOSTNAMES,
  type RequestContext,
} from "@obvia/utilities/next"

/**
 * Type definition for a proxy function used in the proxy layer
 */
type ProxyFn = (request: NextRequest, event: NextFetchEvent, context: RequestContext) => Response | Promise<Response>

/**
 * Resolver interface definition
 */
interface Resolver {
  // A readable identifier for the proxy
  name: string

  // A collection of domain names that should be routed through this proxy
  hostnames: Set<string>

  // The function that handles requests when the domain matches
  proxy: ProxyFn
}

/**
 * Resolver registry for domain → proxy routing
 */
const resolvers: Resolver[] = [
  { name: "App", hostnames: APP_HOSTNAMES, proxy: appProxy },
  { name: "Api", hostnames: API_HOSTNAMES, proxy: apiProxy },
  { name: "Docs", hostnames: DOCS_HOSTNAMES, proxy: docsProxy },
  { name: "Admin", hostnames: ADMIN_HOSTNAMES, proxy: adminProxy },
  { name: "Blog", hostnames: BLOG_HOSTNAMES, proxy: blogProxy },
  { name: "Roadmap", hostnames: ROADMAP_HOSTNAMES, proxy: roadmapProxy },
  { name: "Status", hostnames: STATUS_HOSTNAMES, proxy: statusProxy },
  { name: "Web", hostnames: WEB_HOSTNAMES, proxy: webProxy },
]

/**
 * Resolves the proxy function to run based on the incoming request's domain
 *
 * **Parameter**
 * - `request` - Next.js incoming request (used for request manipulation)
 * - `event` - Next.js fetch event (used for background tasks)
 * - `context` - Parsed request context (domain, path, query, etc.)
 *
 * **Usage**
 * ```ts
 * // Use it in your proxy layer
 * export default async function proxy(request: NextRequest, event: NextFetchEvent) {
 *    // Parse the incoming request
 *    const context = parse(request)
 *
 *    // Run the proxy function
 *    return resolveProxy(request, event, context)
 * }
 * ```
 */
export function resolveProxy(request: NextRequest, event: NextFetchEvent, context: RequestContext) {
  // Iterate over the resolver registry
  for (const { name, hostnames, proxy } of resolvers) {
    // Check if the current domain matches any of the hostnames in the resolver registry
    if (hostnames.has(context.domain)) {
      // Log the event to the console
      proxyLog({ name, request, context })

      // Run the proxy function
      return proxy(request, event, context)
    }
  }

  if (! HOSTNAMES.includes(context.domain)) {
    // Log the event to the console
    proxyLog({ name: "Enterprise", request, context })

    // Run the proxy function
    return enterpriseProxy(request, event, context)
  }

  // Log the event to the console
  proxyLog({ name: "Unknown", request: request, context: context })

  // Return a 404 response
  return new Response("Not found", { status: 404 })
}

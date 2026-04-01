import {
  ADMIN_HOSTNAMES,
  API_HOSTNAMES,
  APP_HOSTNAMES,
  BLOG_HOSTNAMES,
  DOCS_HOSTNAMES,
  ROADMAP_HOSTNAMES,
  STATUS_HOSTNAMES,
  WEB_HOSTNAMES,
  type ProxyConfig,
} from "@obvia/utilities/next"

import {
  adminProxy,
  apiProxy,
  appProxy,
  blogProxy,
  docsProxy,
  roadmapProxy,
  statusProxy,
  webProxy
} from "@library/proxy"

/**
 * Configurations registry for domain → proxy routing
 */
export const proxyConfig: ProxyConfig[] = [
  { name: "App", hostnames: APP_HOSTNAMES, proxy: appProxy },
  { name: "Api", hostnames: API_HOSTNAMES, proxy: apiProxy },
  { name: "Docs", hostnames: DOCS_HOSTNAMES, proxy: docsProxy },
  { name: "Admin", hostnames: ADMIN_HOSTNAMES, proxy: adminProxy },
  { name: "Blog", hostnames: BLOG_HOSTNAMES, proxy: blogProxy },
  { name: "Roadmap", hostnames: ROADMAP_HOSTNAMES, proxy: roadmapProxy },
  { name: "Status", hostnames: STATUS_HOSTNAMES, proxy: statusProxy },
  { name: "Web", hostnames: WEB_HOSTNAMES, proxy: webProxy },
]

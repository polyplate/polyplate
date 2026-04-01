import type { Metadata } from "next"

// Document
import Document from "@interface/document"

/**
 * Root layout component for the entire application
 *
 * **Props**
 * - `children` - The root component of the application
 * - `params` - Locale segment from the URL
 */
export default async function WebRootLayout({ children, params }: LayoutProps<'/polyplate.io'>) {
  return (
    <Document locale="en" suppress={true}>
      {children}
    </Document>
  )
}

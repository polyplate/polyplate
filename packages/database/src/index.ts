import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

// Load the connection string from environment variables
const connectionString = process.env.DATABASE_URL!

// Initialize the PostgreSQL adapter with the connection string
const adapter = new PrismaPg({ connectionString })

// Create a prisma client instance using the adapter
const instance = new PrismaClient({
  adapter
}).$extends(withAccelerate())

// Define a type alias for the PrismaClient instance
type DatabaseClient = typeof instance

// Global cache to prevent multiple client instances during hot reload
const shared = globalThis as unknown as {
  prisma?: DatabaseClient
}

// Use the cached client if available, otherwise create a new one
export const prisma: DatabaseClient = shared.prisma ?? instance

// In development, store the client globally to avoid hot reload issues
if (process.env.NODE_ENV !== "production") {
  shared.prisma = prisma
}

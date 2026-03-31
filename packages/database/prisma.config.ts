import { defineConfig } from "@prisma/config"

export default defineConfig({
  /**
   * The path to the schema file, or path to a folder that shall be recursively searched for *.prisma files
   */
  schema      : "./src/schema",

  /**
   * This block is optional in simple setups but required when running migration or introspection commands
   */
  migrations  : {
    // Directory where Prisma should store generated migration files and look for existing ones
    path: './src/collection',

    // Command or script to run after migrations are applied
    seed: './src/seed.ts',
  },

  /**
   * The datasource configuration, optional for most cases, but required for migration / introspection commands
   */
  datasource  : {
    // Connection string for your database, read from environment variables
    url : process.env.DATABASE_URL!
  }
})

// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { DATABASE_URL, SERVER_URL } from "@/config/env"
import { collections } from "./config/collections"
import { SiteSettings } from "./config/globals/SiteSettings"

export default buildConfig({
  serverURL: SERVER_URL,
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URL,
    },
    push: false,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})

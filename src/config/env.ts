export const DATABASE_URL = process.env.DATABASE_URI!
export const SERVER_URL = process.env.NEXT_PUBLIC_SITE_URL!

if (!DATABASE_URL) {
  throw new Error("DATABASE_URI is not set")
}

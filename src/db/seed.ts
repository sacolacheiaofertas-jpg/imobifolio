import { drizzle } from "drizzle-orm/node-postgres"
import { seedLocations } from "./seeders/locations"
import { seedFeatures } from "./seeders/features"
import { seedProperties } from "./seeders/properties"
import { seedUsers } from "./seeders/users"
import { seedMedia } from "./seeders/media"
import { getPayloadClient } from "./client"
import { reset } from "drizzle-seed"
import { seedAgents } from "./seeders/agents"
import { DATABASE_URL } from "@/config/env"

async function main() {
  console.log(`\n== Seeding database ==\n`)

  console.log(`\n[Connecting and preparing schema...]`)
  const payload = await getPayloadClient()
  const db = drizzle(DATABASE_URL)
  const schema = payload.db.schema
  try {
    console.log(`\n[Resetting existing tables...]`)
    await reset(db, schema)
  } catch (e) {
    console.log(`Tables were already clean or reset. Continuing...`)
  }

  console.log(`\n[Seeding media...]\n`)
  await seedMedia(payload)

  console.log(`\n[Seeding users...]\n`)
  await seedUsers(payload)

  console.log(`\n[Seeding locations...]\n`)
  await seedLocations()

  console.log(`\n[Seeding features...]\n`)
  await seedFeatures(payload)

  console.log(`\n[Seeding agents...]\n`)
  await seedAgents(payload)

  console.log(`\n[Seeding properties...]\n`)
  await seedProperties(payload)
}

main()
  .then(() => {
    console.log(`\nDatabase seeded successfully\n`)
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

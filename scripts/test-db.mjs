import EmbeddedPostgres from "embedded-postgres"
import fs from "fs"
import path from "path"

const dataDir = path.resolve("./.pgdata")
const exists = fs.existsSync(dataDir)

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  port: 5432,
  user: "postgres",
  password: "password",
  persistent: true,
})

console.log("Checking database initialization...")
if (!exists) {
  console.log("Initializing database cluster at", dataDir)
  await pg.initialise()
}

console.log("Starting database...")
await pg.start()
console.log("PostgreSQL started successfully on port 5432!")

try {
  await pg.createDatabase("tenn_homes")
  console.log("Created database tenn_homes")
} catch (e) {
  console.log("Database might already exist:", e.message)
}

const client = pg.getPgClient("tenn_homes")
await client.connect()
const res = await client.query("SELECT 1 as test")
console.log("Query test:", res.rows)
await client.end()

await pg.stop()
console.log("Test completed successfully.")

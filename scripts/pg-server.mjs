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

if (!exists) {
  console.log("Initializing database...")
  await pg.initialise()
}

await pg.start()
console.log("PostgreSQL server running on port 5432.")

try {
  await pg.createDatabase("tenn_homes")
  console.log("tenn_homes database ready.")
} catch (e) {
  console.log("Database tenn_homes ready.")
}

// Keep node alive indefinitely
setInterval(() => {}, 1000 * 60 * 60)

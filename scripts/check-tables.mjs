import EmbeddedPostgres from "embedded-postgres"
import path from "path"

const pg = new EmbeddedPostgres({
  databaseDir: path.resolve("./.pgdata"),
  port: 5432,
  user: "postgres",
  password: "password",
  persistent: true,
})

const client = pg.getPgClient("tenn_homes")
await client.connect()

const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
console.log("Current tables:", res.rows.map(r => r.table_name))

if (process.argv.includes("--drop")) {
  console.log("Dropping and recreating schema public...")
  await client.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
  console.log("Schema public reset clean.")
}

await client.end()

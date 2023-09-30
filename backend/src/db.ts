import {
  ChartsTable,
  EventSchemasTable,
  EventsTable,
} from "@magicinsights/common/entities";
import { Pool } from "pg";
import * as path from "path";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  CamelCasePlugin,
} from "kysely";

export interface Database {
  eventSchemas: EventSchemasTable;
  events: EventsTable;
  charts: ChartsTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: "postgres",
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});

export async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
}

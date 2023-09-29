import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("event_schemas")
    .addColumn("id", "varchar(32)", (col) => col.primaryKey())
    .addColumn("schema", "jsonb", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("events")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("event_schema_id", "varchar(32)", (col) =>
      col.references("event_schemas.id").onDelete("cascade").notNull()
    )
    .addColumn("data", "jsonb", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("events").execute();
  await db.schema.dropTable("event_schemas").execute();
}

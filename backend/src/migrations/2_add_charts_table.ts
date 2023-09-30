import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("charts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("visualization", "text", (col) => col.notNull())
    .addColumn("property", "text", (col) => col.notNull())
    .addColumn("x", "integer", (col) => col.notNull())
    .addColumn("y", "integer", (col) => col.notNull())
    .addColumn("event_schema_id", "varchar(32)", (col) =>
      col.references("event_schemas.id").onDelete("cascade").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("charts").execute();
}

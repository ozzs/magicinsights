import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface EventSchemasTable {
  id: string;
  schema: Record<string, any>;
  created_at: ColumnType<Date, never, never>;
}

export type EventSchema = Selectable<EventSchemasTable>;
export type NewEventSchema = Insertable<EventSchemasTable>;
export type EventSchemaUpdate = Updateable<EventSchemasTable>;

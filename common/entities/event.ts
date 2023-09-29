import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface EventsTable {
  id: Generated<number>;
  eventSchemaID: string;
  data: any;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Event = Selectable<EventsTable>;
export type NewEvent = Insertable<EventsTable>;
export type EventUpdate = Updateable<EventsTable>;

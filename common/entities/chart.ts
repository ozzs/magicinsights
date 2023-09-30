import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export enum ChartVisualization {
  BarChart = "bar",
  PieChart = "pie",
}

export interface ChartsTable {
  id: Generated<number>;
  title: string;
  eventSchemaID: string;
  visualization: ChartVisualization;
  property: string;
  x: number;
  y: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Chart = Selectable<ChartsTable>;
export type NewChart = Insertable<ChartsTable>;
export type ChartUpdate = Updateable<ChartsTable>;

import fastify from "fastify";
import { db, migrateToLatest } from "./db";
import Validator, { SchemaObject } from "ajv";
import { ChartVisualization } from "@magicinsights/common/entities";
import { sql } from "kysely";

const server = fastify();

// TODO: Split to event-schemas.ts
interface NewEventSchemaRequest {
  id: string;
  schema: SchemaObject;
}

interface DeleteEventSchemaRequest {
  id: string;
}

server.get("/api/event-schemas", async function (request, reply) {
  const eventSchemas = await db
    .selectFrom("eventSchemas")
    .selectAll()
    .execute();

  reply.status(200);
  reply.send(eventSchemas);
});

server.post<{ Body: NewEventSchemaRequest }>(
  "/api/event-schemas",
  async function (request, reply) {
    const validator = new Validator({
      strict: true,
      allErrors: true,
      strictSchema: true,
    });

    // Try to compile the schema
    try {
      validator.compile(request.body.schema);
    } catch (e) {
      reply.status(400);
      reply.send({ error: "Invalid JSON schema" });
      return;
    }

    // Make sure we have ID for the JSON Schema
    if (!request.body.id) {
      reply.status(400);
      reply.send({ error: "Event schema must contain an ID." });
      return;
    }

    await db.insertInto("eventSchemas").values(request.body).execute();

    reply.status(201);
    reply.send({ status: "OK" });
  }
);

server.delete<{ Params: DeleteEventSchemaRequest }>(
  "/api/event-schemas/:id",
  async function (request, reply) {
    const [{ numDeletedRows }] = await db
      .deleteFrom("eventSchemas")
      .where("id", "=", request.params.id)
      .execute();

    if (numDeletedRows === BigInt(0)) {
      reply.status(404);
      reply.send({ error: "Event schema not found." });
      return;
    }

    reply.status(200);
    reply.send({ status: "OK" });
  }
);

// TODO: Split to events.ts
interface NewEventRequest {
  schemaID: string;
  data: any;
}

server.post<{ Body: NewEventRequest }>(
  "/api/events",
  async function (request, reply) {
    const validator = new Validator({
      strict: true,
      allErrors: true,
      strictSchema: true,
    });

    // Get schema from DB
    const eventSchema = await db
      .selectFrom("eventSchemas")
      .selectAll()
      .where("id", "=", request.body.schemaID)
      .executeTakeFirst();

    if (!eventSchema) {
      reply.status(404);
      reply.send({ error: "Event schema not found" });
      return;
    }

    if (!validator.validate(eventSchema.schema, request.body.data)) {
      reply.status(400);
      reply.send({ error: validator.errors });
      return;
    }

    await db
      .insertInto("events")
      .values({ eventSchemaId: request.body.schemaID, data: request.body.data })
      .execute();

    reply.status(201);
    reply.send({ status: "OK" });
  }
);

// TODO: Split to charts.ts
interface NewChartRequest {
  title: string;
  eventSchemaId: string;
  visualization: ChartVisualization;
  property: string;
  x: number;
  y: number;
}

interface UpdateChartPositionsRequest {
  charts: {
    id: number;
    x: number;
    y: number;
  }[];
}

server.get("/api/charts", async function (request, reply) {
  // Get all charts
  const charts = await db.selectFrom("charts").selectAll().execute();

  // Calculate data for each chart
  const result = [];
  for (const chart of charts) {
    const data = await db
      .selectFrom("events")
      .select([
        sql<string>`data->>${chart.property}`.as("name"),
        sql<number>`COUNT(*)`.as("value"),
      ])
      .where("eventSchemaId", "=", chart.eventSchemaId)
      .groupBy("name")
      .execute();

    result.push({ chart, data });
  }

  reply.status(200);
  reply.send(result);
});

server.post<{ Body: NewChartRequest }>(
  "/api/charts",
  async function (request, reply) {
    // TODO: Validate request body
    await db.insertInto("charts").values(request.body).execute();

    reply.status(201);
    reply.send({ status: "OK" });
  }
);

server.post<{ Body: UpdateChartPositionsRequest }>(
  "/api/charts/update-positions",
  async function (request, reply) {
    // TODO: Validate request body
    for (const chart of request.body.charts) {
      await db
        .updateTable("charts")
        .set({ x: chart.x, y: chart.y })
        .where("id", "=", chart.id)
        .execute();
    }

    reply.status(200);
    reply.send({ status: "OK" });
  }
);

async function main() {
  // Run migrations
  await migrateToLatest();

  // Run the server!
  server.listen({ port: 3000 }, function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
  });
}

main();

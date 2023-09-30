import fastify from "fastify";
import { db, migrateToLatest } from "./db";
import Validator, { SchemaObject } from "ajv";

const server = fastify();

// TODO: Split to event-schemas.ts
interface NewEventSchemaRequest {
  id: string;
  schema: SchemaObject;
}

interface DeleteEventSchemaRequest {
  id: string;
}

server.get("/event-schemas", async function (request, reply) {
  const eventSchemas = await db
    .selectFrom("eventSchemas")
    .selectAll()
    .execute();

  reply.status(200);
  reply.send(eventSchemas);
});

server.post<{ Body: NewEventSchemaRequest }>(
  "/event-schemas",
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
  "/event-schemas/:id",
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
  "/events",
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
      .values({ eventSchemaID: request.body.schemaID, data: request.body.data })
      .execute();

    reply.status(201);
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

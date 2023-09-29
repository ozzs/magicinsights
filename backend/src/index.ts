import fastify from "fastify";
const server = fastify();

// Declare a route
server.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
server.listen({ port: 3000 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});

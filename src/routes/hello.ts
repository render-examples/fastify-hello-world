import { FastifyInstance } from "fastify";

export async function helloRoute(app: FastifyInstance) {
  app.get("/", (req, reply) => {
    return reply.status(200).send({ message: 'Hello, World!'});
  });
}

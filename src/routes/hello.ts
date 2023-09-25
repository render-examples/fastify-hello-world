import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';

export async function helloRoute(app: FastifyInstance) {
  app.get("/", (req, reply) => {
    return reply.status(200).send({ result: 'teste' });
  });
}
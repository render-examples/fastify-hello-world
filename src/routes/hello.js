const client = require("../lib/prisma");

async function helloRoute(app) {
  app.get("/", (req, reply) => {
    return reply.status(200).send({ result: 'teste' });
  });
}

module.exports = helloRoute;

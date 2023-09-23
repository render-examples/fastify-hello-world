export async function helloRoute(app) {
  app.get("/", (req, reply) => {
    return reply.status(200).send({ message: 'Hello, World!'});
  });
}

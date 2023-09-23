const prisma = require("../lib/prisma");
const verifyJWT = require("../lib/utils");
require("dotenv").config();

async function protectedRoute(app) {
  app.get("/users", { preHandler: verifyJWT }, async (request, reply) => {
    const user = request.user;
    console.log('user =====>', user);
    const users = await prisma.user.findMany();
    console.log('users', users);
    return reply.status(200).send({ users });
  });
}

module.exports = protectedRoute;

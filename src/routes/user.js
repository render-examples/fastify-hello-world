const prisma = require("../lib/prisma");
const verifyJWT = require("../lib/utils");
require("dotenv").config();

async function userDataRoute(app) {
  app.post("/user", { preHandler: verifyJWT }, async (request, reply) => {
    const userId = request.body.userId;
    console.log('userid ====================', request.body);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId
      }
    });
    console.log("user", user);
    return reply.status(200).send({ user });
  });
}

module.exports = userDataRoute;

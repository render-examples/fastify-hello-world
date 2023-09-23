require("dotenv").config();
const prisma = require("../lib/prisma");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

async function signInRoute(app) {
  app.post("/signin", async (req, reply) => {
    const { email, password } = req.body;

    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
        password: hashPassword,
      },
    });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 // 60 min
      });
      return reply.status(200).send({ user, token });
    }
    return reply.status(401).send({ message: "Credenciais inválidas" });
  });
}

module.exports = signInRoute;

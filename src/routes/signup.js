const prisma = require("../lib/prisma");
const crypto = require('crypto');

async function signUpRoute(app) {
  app.post("/signup", async (req, reply) => {
    const { name, email, password } = req.body;
    console.log('body', req.body);
    const hashPassword = crypto.createHash('sha1').update(password).digest('hex');

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword
        }
      });
  
      return reply.status(201).send({ message: `Usuário criado com sucesso! `})
    } catch (error) {
      console.log('error =========', error);
      return reply.status(400).send({ message: `Erro ao criar o usuário`})
    }
  });
}

module.exports = signUpRoute;

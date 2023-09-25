import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';
import { z } from 'zod';
import { FastifyInstance } from 'fastify';
dotenv.config();

export async function authRoute(app: FastifyInstance) {
  app.post("/signin", async (req, reply) => {

    const bodySchema = z.object({
      email: z.string(),
      password: z.string()
    });

    try {
      const { email, password } = bodySchema.parse(req.body);
      const hashPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");
  
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
          password: hashPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
        }
      });
      if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: 60 * 60 // 60 min
        });
        return reply.status(200).send({ user, token });
      }
    } catch (error) {
      return reply.status(401).send({ message: "Credenciais inválidas" });
    }

  });

  // signup
  app.post("/signup", async (req, reply) => {

    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    });

    const { name, email, password } = bodySchema.parse(req.body);
    
    const hashPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return reply
        .status(201)
        .send({ message: `Usuário criado com sucesso! `, user });
    } catch (error) {
      return reply.status(400).send({ message: `Erro ao criar o usuário` });
    }
  });
}

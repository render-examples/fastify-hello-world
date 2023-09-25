import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

interface CustomRequest extends FastifyRequest {
  user?: any;
}

export async function verifyJWT(
  request: CustomRequest,
  reply: FastifyReply,
  next: (err?: Error) => void
) {
  const token = request.headers.authorization;

  if (!token) {
    reply.code(401).send({ message: 'Token não fornecido' })
    next(new Error('Token não fornecido'));
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    request.user = decoded;
    next()
  } catch (error) {
    reply.code(401).send({ message: 'Token inválido.' });
    return;
  }
}

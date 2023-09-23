require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(request, reply, next) {
  const token = request.headers.authorization;

  if (!token)
    return reply
      .status(401)
      .send({ auth: false, message: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    console.log("error =======>", error);
    return reply.status(401).send({ message: 'Token inválido.' });
  }
}

module.exports = verifyJWT;
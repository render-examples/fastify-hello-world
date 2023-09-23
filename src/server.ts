import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import { helloRoute } from "./routes/hello";

const port = parseInt(process.env.PORT!) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: "*",
});

app.register(helloRoute);

app.listen(
  {
    host,
    port,
  },
  (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);

// fastify.listen({host: host, port: port }, function (err, address) {
//   if (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// })

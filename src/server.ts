const fastifyCors = require("@fastify/cors");
const app = require("fastify")({
  logger: true,
});
const helloRoute = require("./routes/hello");

const port = parseInt(process.env.PORT!) || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

app.register(fastifyCors, {
  origin: "*",
});

app.register(helloRoute);

app.listen(
  {
    host,
    port,
  },
  (err: any, _address: any) => {
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

const fastifyCors = require("@fastify/cors");
const app = require("fastify")({
  logger: true,
});
const helloRoute = require("./routes/hello");

const port = process.env.PORT || 3000;
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
  (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);

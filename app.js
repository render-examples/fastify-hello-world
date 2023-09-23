require('dotenv').config();
const app = require("fastify")({
  logger: true,
});
const fastifyCors = require("@fastify/cors");
const helloRoute = require("./src/routes/hello");
const signUpRoute = require("./src/routes/signup");
const protectedRoute = require('./src/routes/protected');
const signInRoute = require('./src/routes/signin');
const userDataRoute = require('./src/routes/user');

const port = process.env.SERVER_PORT || 3000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

app.register(fastifyCors, {
  origin: '*'
});

app.register(helloRoute);
app.register(signUpRoute);
app.register(signInRoute);

app.register(protectedRoute);
app.register(userDataRoute);

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

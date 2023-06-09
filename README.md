# README

This is the [Fastify](https://www.fastify.io/) [Hello world](https://www.fastify.io/docs/latest/Guides/Getting-Started/) example on [Render](https://render.com).

The app in this repo is deployed at [https://fastify.onrender.com](https://fastify.onrender.com).

> Note: Fastify's `.listen` method default binding uses `localhost` (`127.0.0.1`), whereas Render requires `0.0.0.0`.

## Deployment

See https://render.com/docs/deploy-node-fastify-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `npm install`
  * Start Command: `node app.js`

Or simply click:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/fastify-hello-world)

That's it! Your web service will be live on your Render URL as soon as the build finishes.
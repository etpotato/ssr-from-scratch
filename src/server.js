/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { FAVICON } from './const';
import api from './api';
import redisClient from './redis';
import App from './public/App';

const PORT = process.env.PORT || 3000;

const getHtml = ({
  title, favicon, initialData, react,
}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'ssr demo app'}</title>
    <link href="${favicon}" rel="shortcut icon" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    <script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>
    <script defer src="/static/client.bundle.js"></script>
  </head>
  <body>
    <div id="root">${react}</div>
  </body>
  </html>
`;

const render = ({ location, initialData }) => {
  const react = renderToString(
    <StaticRouter location={location}>
      <App data={initialData} />
    </StaticRouter>,
  );
  const html = getHtml({ favicon: FAVICON, initialData, react });

  return html;
};

const sendNotFound = (res) => {
  const html = render({ location: '/404' });
  return res.status(404).send(html);
};

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage, '\n');
  });
  next();
});

app.get('/', async (req, res) => {
  try {
    const html = render({ location: req.url, initialData: {} });
    res.send(html);
  } catch (err) {
    sendNotFound(res);
    console.error(err);
  }
});

app.get('/products', async (req, res) => {
  try {
    const initialData = await api.getProducts();
    const html = render({ location: req.url, initialData });
    res.send(html);
  } catch (err) {
    sendNotFound(res);
    console.error(err);
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const param = Number.isNaN(id) ? undefined : id;
    const initialData = await api.getProduct(param);
    const html = render({ location: req.url, initialData });
    res.send(html);
  } catch (err) {
    sendNotFound(res);
    console.error(err);
  }
});

app.get('/api/products', async (_req, res) => {
  try {
    const data = await api.getProducts();
    res.send(data);
  } catch (err) {
    sendNotFound(res);
    console.error(err);
  }
});

app.get('*', async (_req, res, next) => {
  try {
    sendNotFound(res);
  } catch (err) {
    next(err);
    console.error(err);
  }
});

const server = app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

const shutdownGracefully = (exitArg = 0) => server.close(async () => {
  await redisClient.disconnect();
  console.log('\n× server closed');
  process.exit(exitArg);
});

process.once('uncaughtException', (err) => {
  console.error(err);
  shutdownGracefully(1);
});
process.once('SIGTERM', shutdownGracefully);
process.once('SIGINT', shutdownGracefully);

/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import fetch from 'node-fetch';

import App from './public/App';
import { FAVICON } from './const';

const getData = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/?limit=20');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return 'an error occured while fetching data';
  }
};

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
    <script defer src="static/client.bundle.js"></script>
  </head>
  <body>
    <div id="root">${react}</div>
  </body>
  </html>
`;

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('*', async (req, res) => {
  try {
    const initialData = await getData();
    const react = renderToString(
      <StaticRouter location={req.url}>
        <App data={initialData} />
      </StaticRouter>,
    );
    const html = getHtml({ favicon: FAVICON, initialData, react });

    res.send(html);
  } catch (err) {
    console.error(err);
  }
});

const server = app.listen(3000, () => console.log('server is listening on port 3000'));

const shutdownGracefully = (exitArg = 0) => server.close(() => {
  console.log('\n× server closed');
  process.exit(exitArg);
});

process.once('uncaughtException', (err) => {
  console.error(err);
  shutdownGracefully(1);
});
process.once('SIGTERM', shutdownGracefully);
process.once('SIGINT', shutdownGracefully);

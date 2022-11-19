import path from 'path';
import express  from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';
import App from './public/App';

const getData = async () => {
  try {
    const random = Math.floor(Math.random() * 100) + 1;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${random}`);
    const data = await res.json();
    return data.body;
  } catch (err) {
    console.error(err);
    return 'an error occured while fetching data';
  }
};

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('/', async (_req, res) => {
  const initialData = await getData();

  const component = renderToString(<App text={initialData}/>);

  const html = `
    <!doctype html>
      <html>
      <head>
      </head>
      <body>
        <div id="root">${component}</div>
        <script>window.__INITIAL_DATA__ = ${JSON.stringify({ text: initialData })}</script>
        <script src="/static/client.bundle.js"></script>
      </body>
    </html>`;

  res.send(html);
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

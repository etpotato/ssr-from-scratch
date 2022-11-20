/* eslint-disable no-console */
import path from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import fetch from 'node-fetch';
import App from './public/App';

const getData = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/?limit=20');
    const data = await res.json();
    return data.products;
  } catch (err) {
    console.error(err);
    return 'an error occured while fetching data';
  }
};

const app = express();
const html = readFileSync(path.resolve(__dirname, 'public', 'index.html')).toString();

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.get('/', async (_req, res) => {
  try {
    const initialData = await getData();
    const htmlWithData = html.replace('<!-- __INITIAL_DATA__ -->', JSON.stringify({ products: initialData }));
    const [htmlStart, htmlEnd] = htmlWithData.split('<!-- __APP__ -->');

    res.write(htmlStart);

    const componentStream = renderToPipeableStream(<App products={initialData} />);

    componentStream.pipe(res, { end: false });

    componentStream.on('end', () => res.write(htmlEnd));

    res.end();
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

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
hydrateRoot(
  container,
  <React.StrictMode>
    {/* eslint-disable-next-line no-underscore-dangle */}
    <App products={window.__INITIAL_DATA__.products} />
  </React.StrictMode>,
);

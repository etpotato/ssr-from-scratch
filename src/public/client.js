import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
hydrateRoot(
  container,
  <React.StrictMode>
    <BrowserRouter>
      {/* eslint-disable-next-line no-underscore-dangle */}
      <App data={window.__INITIAL_DATA__} />
    </BrowserRouter>
  </React.StrictMode>,
);

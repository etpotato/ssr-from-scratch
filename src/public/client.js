import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
hydrateRoot(
  container,
  <React.StrictMode>
    <App text={window.__INITIAL_DATA__.text}/>
  </React.StrictMode>
);

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';

export default function App({ data }) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products items={data.products} />} />
    </Routes>
  );
}

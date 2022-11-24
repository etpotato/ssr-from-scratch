import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Product from './pages/Product';
import NotFound from './pages/NotFound';

export default function App({ data }) {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products data={data?.products} />} />
      <Route path="/product/:id" element={<Product data={data?.product} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

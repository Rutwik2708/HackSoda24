// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListing from './components/ProductListing';
import Product from './components/Product';
import HomePage from './components/Home';
import ProductCatalog from './components/ProductCatalog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list-product" element={<ProductListing />} />
        <Route path="/productCatalog" element={<ProductCatalog userId={1} />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;

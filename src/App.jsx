import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage ';

const App = () => {
  return (
    <Router basename="/helplift">
      <Routes>
        <Route path="/helplift/" element={<HomePage />} />
        <Route path="/helplift/products/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;

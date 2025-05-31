import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductItem from './components/ProductItem';
import {BrowserRouter, Routes, Route} from 'react-router'
import AddProduct from './components/AddProduct';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Shop />} />
      <Route path="/products/:id" element={<ProductItem />} />
      <Route path="/add" element={<AddProduct />} />
    </Routes>
  </BrowserRouter>
  );
}

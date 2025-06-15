import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductItem from './components/ProductItem';
import {BrowserRouter, Routes, Route} from 'react-router'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import CartContext from './context/CartContext';
import {useState} from 'react';


export default function App() {

  const [cartList, setCartList] = useState([])
  const addCartItem = product => {
    setCartList(prevCartList => [...prevCartList, product])
  }
  const deleteCartItem = (id) => {
    setCartList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    
      <BrowserRouter>
      <CartContext
        value={{
          cartList,
          addCartItem,
          deleteCartItem,
        }}
      >
      
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
          } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
        <Route path="/products" element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
          } />
        <Route path="/products/:id" element={
          <ProtectedRoute>
            <ProductItem />
          </ProtectedRoute>
          } />
        
      </Routes>
      </CartContext>
    </BrowserRouter>

  );
}

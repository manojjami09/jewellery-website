import React from 'react';

const CartContext = React.createContext({
  cartList: [],
  setCartList: () => {},
  addCartItem: () => {},
  deleteCartItem: () => {},
});

export default CartContext;

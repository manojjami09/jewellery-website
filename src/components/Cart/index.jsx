import Navbar from "../Navbar";
import CartListView from '../CartListView'
import CartContext from "../../context/CartContext";
import {use} from 'react'
import "./index.css";
import EmptyCartView from "../EmptyCartView";


const Cart = () => {
  const value = use(CartContext)
  const {cartList} = value
  
  const showEmptyView = cartList.length === 0

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {showEmptyView ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <CartListView/>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
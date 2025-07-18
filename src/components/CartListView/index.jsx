import { useContext, useState } from 'react';
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

import './index.css'

const CartListView = () => {
  const { cartList, deleteCartItem, setCartList } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false)

  const getCartTotal = () =>
    cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const onCheckout = () => {
    setOrderPlaced(true);
    setCartList([]); 
  };  

  if (orderPlaced) {
    return (
      <div className="success-container">
        <div className="checkmark-circle">✓</div>
        <h1 className="order-message">Order Placed Successfully!</h1>
        <p className="thank-you-msg">Thank you for shopping with us.</p>
      </div>
    );
  }

  return (
    <div className="cart-list-view-container">
      <div>
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} deleteItem={deleteCartItem} />
          ))}
        </ul>
      </div>
      <div className="cart-total-container">
        <h3>Total: ₹{getCartTotal()}</h3>
        <button className="checkout-btn" onClick={onCheckout}>Buy Now</button>
      </div>
    </div>
  );
}

export default CartListView

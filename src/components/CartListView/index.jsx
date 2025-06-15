import {use} from 'react'

import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

import './index.css'

const cartList = []

const CartListView = () => {
  const value = use(CartContext)
  const {cartList} = value
  const {deleteCartItem} = value
  const getCartTotal = () =>
    cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-list-view-container">
      <div>
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} deleteItem = {deleteCartItem}/>
          ))}
        </ul>
      </div>
      <div class="cart-total-container">
        <h3>Total: ₹{getCartTotal()}</h3>
      </div>
    </div>
  )
}

export default CartListView

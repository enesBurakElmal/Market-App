import React, { useContext } from 'react'

import { CartContext } from '../../contexts/cart-item.context'

import styles from './cart-item-component.module.scss'

const CartItem = ({ cartItem }) => {
  const { name, quantity, price } = cartItem
  const { addItemToCart, removeItemToCart } = useContext(CartContext)

  const addProductToCart = () => addItemToCart(cartItem)
  const removeProductToCart = () => removeItemToCart(cartItem)

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemList}>
        <div className={styles.leftContent}>
          <h4>{name}</h4>
          <span className={styles.priceSpan}>{price}</span>
        </div>
        <div className={styles.rightContent}>
          <button
            className={styles.cartItemButton}
            onClick={removeProductToCart}
          >
            -
          </button>
          <p>{quantity}</p>
          <div>
            <button
              className={styles.cartItemButton}
              onClick={addProductToCart}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem

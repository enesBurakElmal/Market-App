import { useContext, Fragment } from 'react'

import styles from './checkout-component.module.scss'

import { CartContext } from '../../contexts/cart-item.context'

import CartItem from '../cart-item/cart-item.component'

const PayloadComponent = (payload) => {
  const { cartItems, cartTotal, addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(payload)

  return (
    <Fragment>
      <div className={styles.payloadContainer}>
        <div className={styles.payloadContent}>
          {cartItems.length ? (
            cartItems.map((item, index) => (
              <CartItem key={index} cartItem={item}></CartItem>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
          <div className={styles.buyContent}>
            <button
              className={styles.buyButton}
              type="button"
              onClick={cartTotal === 0 ? addProductToCart : null}
              style={{
                cursor: cartTotal === `0.00` ? 'not-allowed' : 'pointer',
              }}
            >
              {cartTotal}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default PayloadComponent

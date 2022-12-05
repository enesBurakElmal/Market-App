import React from 'react'

import Logo from './../../assets/Logo.svg'
import CheckoutAsset from './../../assets/checkout.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart-item.context'

import styles from './navbar-component.module.scss'

const Navbar = ({ checkoutController }) => {
  const { cartTotal } = useContext(CartContext)

  return (
    <nav className={styles.navbarTag}>
      <div className={styles.navbarContainer}>
        <div className={styles.nullDiv} />
        <div className={styles.logoDiv}>
          <img src={Logo} alt="logo" className={styles.navbarLogo} />
        </div>
        <div
          className={`${styles.navbarPayload} ${
            cartTotal > 0 ? styles.navbarPayloadActive : ''
          }`}
          onClick={checkoutController}
        >
          <img src={CheckoutAsset} alt="checkout" />
          <div>
            <p className={styles.payloadText} value={cartTotal}>
              ₺ {cartTotal}
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

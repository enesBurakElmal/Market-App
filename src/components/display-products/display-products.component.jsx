import React, { useContext, useState, Fragment } from 'react'
import ReactPaginate from 'react-paginate'

import { CartContext } from '../../contexts/cart-item.context'
import styles from './display-products.module.scss'

const EmployeesIndex = () => {
  const [buttonLabel, setButtonLabel] = useState('mug')

  const { addItemToCart, paginationItems, pageCount, setCurrentPage } =
    useContext(CartContext)

  const handlePageClick = (onPage) => {
    setCurrentPage(onPage.selected + 1)
  }

  const FilterButton = ({ onFilter, label, active }) => {
    return (
      <Fragment>
        <div style={{}}>
          <button
            className={`${styles.button} ${
              buttonLabel === label ? styles.active : ''
            } ${{ transition: 'ease-in-out 0.3s' }}`}
            onClick={active}
            style={{ transition: ' ease-in-out 0.3s' }}
          >
            {label}
          </button>
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className={styles.displayProducts}>
        <div className={styles.header}>
          <p>Products</p>
          <div className={styles.button__content}>
            <FilterButton label={'mug'} active={() => setButtonLabel('mug')} />
            <FilterButton
              label={'shirt'}
              active={() => setButtonLabel('shirt')}
            />
          </div>
        </div>
        <div className={styles.products}>
          {paginationItems.map((cartItem, index) => {
            const addProductToCart = () => addItemToCart(cartItem)
            return (
              <div className={styles.productCard} key={index}>
                <div className={styles.imgDiv}></div>
                <p className={styles.itemPrice}>
                  <span className={styles.span}>₺ </span>
                  {cartItem.price}
                </p>
                <div>
                  <h4 className={styles.itemName}>{cartItem.name}</h4>
                </div>
                <button className={styles.buyButton} onClick={addProductToCart}>
                  Add
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={4}
        pageRangeDisplayed={4}
        onPageChange={handlePageClick}
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        containerClassName={styles.navigationButtons}
        subContainerClassName={styles.pagesPagination}
        activeClassName={styles.navigationActive}
        previousLinkClassName={styles.previousButton}
        nextLinkClassName={styles.nextButton}
        disabledClassName={styles.navigationDisabled}
        activeLinkClassName={styles.navigationActive}
      />
    </Fragment>
  )
}

export default EmployeesIndex

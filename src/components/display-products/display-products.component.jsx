import React, { useContext, useState, Fragment } from 'react'
import ReactPaginate from 'react-paginate'

import { CartContext } from '../../contexts/cart-item.context'
import ProductImage from '../../assets/github-logo.png'
import styles from './display-products.module.scss'

const EmployeesIndex = () => {
  const [buttonLabel, setButtonLabel] = useState('')
  const {
    addItemToCart,
    paginationItems,
    pageCount,
    setCurrentPage,
    filterWithItemTypes,
    products,
  } = useContext(CartContext)

  const handlePageClick = (onPage) => {
    const newOffset = (onPage.selected % products.length) + 1
    setCurrentPage(newOffset)
  }

  const handleFilter = (e) => {
    setButtonLabel(e.target.value)
    filterWithItemTypes(e.target.value)
    if (buttonLabel === e.target.value) {
      setButtonLabel('')
    } else {
      setButtonLabel(e.target.value)
    }
  }

  const FilterButton = ({ label, onFilter }) => {
    return (
      <Fragment>
        <button
          className={`${styles.button} ${
            buttonLabel === label ? styles.active : ''
          } ${{ transition: 'ease-in-out 0.3s' }}`}
          onClick={onFilter}
        >
          {label}
        </button>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className={styles.displayProducts}>
        <div className={styles.header}>
          <p>Products</p>
          <div className={styles.button__content}>
            <FilterButton
              label={'mug'}
              onFilter={() => handleFilter({ target: { value: 'mug' } })}
            />
            <FilterButton
              label={'shirt'}
              onFilter={() => handleFilter({ target: { value: 'shirt' } })}
            />
          </div>
        </div>
        <div className={styles.products}>
          {paginationItems.map((cartItem, index) => {
            const addProductToCart = () => addItemToCart(cartItem)
            return (
              <div className={styles.productCard} key={index}>
                <div className={styles.imgDiv}>
                  <a
                    href={'https://github.com/enesBurakElmal/'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img src={ProductImage} alt="product" />
                  </a>
                </div>
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
      <div style={{}} className={styles.paginate__wrapper}>
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
          // renderOnZeroPageC  ount={null}
        />
      </div>
    </Fragment>
  )
}
export default EmployeesIndex

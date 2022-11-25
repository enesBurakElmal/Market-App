import React, { useContext, useState, useEffect, Fragment } from 'react'

import { CartContext } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const BrandsComponent = (e) => {
  const [selectedSlugs, setSelectedSlugs] = useState([])

  const {
    filteredTags,
    setSearchfield,
    products,
    setProducts,
    setPageCount,
    companies,
  } = useContext(CartContext)

  const handleSearch = (e) => {
    filteredTags(e.target.value)
    setSearchfield(e.target.value)
  }
  const selectedCompanyFilter = (e) => {
    setSelectedSlugs([...selectedSlugs, e.target.name])
  }

  useEffect(() => {
    if (selectedSlugs.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.manufacturer
          .toLowerCase()
          .includes(selectedSlugs.map((slug) => slug.toLowerCase()))
      )
      setProducts(filteredProducts)
      setPageCount(Math.ceil(filteredProducts.length / 16))
    } else {
      setProducts(products)
    }
  }, [selectedSlugs, products, setProducts, setPageCount])

  return (
    <Fragment>
      <FilterComponent
        header="Brands"
        inputData={companies}
        productsData={products}
        searchfield={handleSearch}
        inputEvent={selectedCompanyFilter}
      />
    </Fragment>
  )
}

export default BrandsComponent

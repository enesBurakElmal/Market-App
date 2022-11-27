import React, { useContext, useState, useEffect, Fragment } from 'react'

import { CartContext, allProducts } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const BrandsComponent = () => {
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
    if (selectedSlugs.includes(e.target.name)) {
      setSelectedSlugs(selectedSlugs.filter((slug) => slug !== e.target.name))
    }
  }

  useEffect(() => {
    if (selectedSlugs.length === 0) {
      setProducts(allProducts)
    } else {
      setProducts(
        allProducts.filter((product) =>
          selectedSlugs.includes(product.manufacturer)
        )
      )
    }
  }, [selectedSlugs, products, setProducts])

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

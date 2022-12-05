import React, { useContext, useState, useEffect, Fragment } from 'react'

import { CartContext, allProducts } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const BrandsComponent = () => {
  const [selectedSlugs, setSelectedSlugs] = useState([])

  const {
    brandsInputFilter,
    products,
    setProducts,
    companies,
    setPaginationItems,
    setPageCount,
    currentPage,
    currentPageProducts,
  } = useContext(CartContext)

  const handleSearch = (e) => brandsInputFilter(e.target.value)

  const selectedCompanyFilter = (e) => {
    setSelectedSlugs([...selectedSlugs, e.target.name])
    if (selectedSlugs.includes(e.target.name)) {
      setSelectedSlugs(selectedSlugs.filter((slug) => slug !== e.target.name))
    }
  }

  useEffect(() => {
    if (selectedSlugs.length > 0) {
      const afterSlugFilter = products.filter((product) =>
        selectedSlugs.includes(product.manufacturer)
      )
      // setPaginationItems(currentPageProducts(afterSlugFilter, currentPage))
      setProducts(afterSlugFilter)
      setPageCount(Math.ceil(afterSlugFilter.length / 16))
    } else {
      setProducts(allProducts)
      setPageCount(Math.ceil(allProducts.length / 16))
    }
  }, [selectedSlugs, currentPage])

  const handleSelectAll = () => {
    setProducts(allProducts)
    setSelectedSlugs([])
  }

  return (
    <Fragment>
      <FilterComponent
        header="Brands"
        inputData={companies}
        productsData={products}
        searchfield={handleSearch}
        inputEvent={selectedCompanyFilter}
        selectAll={handleSelectAll}
      />
    </Fragment>
  )
}

export default BrandsComponent

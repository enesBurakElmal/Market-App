import React, { useContext, Fragment, useState, useEffect } from 'react'

import { CartContext, allProducts } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const TagsComponent = () => {
  const { productsTags, products, setProducts, tagsInputFilter } =
    useContext(CartContext)
  const [handleTag, setHandleTag] = useState([])

  const handleSearch = (e) => tagsInputFilter(e.target.value)

  const selectedTagFilter = (e) => {
    setHandleTag([...handleTag, e.target.name])
    if (handleTag.includes(e.target.name)) {
      setHandleTag(handleTag.filter((tag) => tag !== e.target.name))
    }
  }

  useEffect(() => {
    if (handleTag.length === 0) {
      setProducts(allProducts)
    } else {
      const afterTagFilter = allProducts.filter((product) =>
        handleTag
          .map((tag) => product.tags.map((productTag) => productTag === tag))
          .flat()
          .includes(true)
      )
      setProducts(afterTagFilter)
    }
  }, [handleTag])

  const handleSelectAll = () => {
    setProducts(allProducts)
    setHandleTag([])
  }

  return (
    <Fragment>
      <FilterComponent
        header="Tags"
        inputData={productsTags}
        productsData={products}
        searchfield={handleSearch}
        inputEvent={selectedTagFilter}
        selectAll={handleSelectAll}
      />
    </Fragment>
  )
}

export default TagsComponent

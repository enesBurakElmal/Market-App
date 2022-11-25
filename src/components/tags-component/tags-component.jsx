import React, { useContext, Fragment } from 'react'

import { CartContext } from '../../contexts/cart-item.context'

import FilterComponent from '../filter-component/filter.component'

const TagsComponent = () => {
  const { tagFilter, setTagField, productsTags, products } =
    useContext(CartContext)

  const handleTagFilter = (e) => {
    tagFilter(e.target.value)
    setTagField(e.target.value)
  }

  return (
    <Fragment>
      <FilterComponent
        header="Tags"
        inputData={productsTags}
        productsData={products}
        searchfield={handleTagFilter}
      />
    </Fragment>
  )
}

export default TagsComponent

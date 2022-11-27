import React, { Fragment } from 'react'

import SearchBox from '../search-box/search-box.component'

import styles from './filter.module.scss'

const FilterComponent = ({
  searchfield,
  inputData,
  header,
  inputEvent,
  productsData,
  selectAll,
}) => {
  const sameNameCountTags = (name) => {
    const count = productsData.filter((item) => item.tags.includes(name))
    return count.length
  }

  const sameNameCountBrands = (productsArray, name) => {
    const count = productsArray.filter((item) =>
      item.manufacturer.includes(name)
    )
    return count.length
  }

  const productsTotalTagCount = (productsArray) => {
    const tagCount = productsArray.map((item) => item.tags)
    const tagCountFlat = tagCount.flat()
    const uniqueTags = [...new Set(tagCountFlat)]
    return uniqueTags
  }

  const brandsTotalCount = (productsArray) => {
    const brands = productsArray.map((item) => item.manufacturer)
    const uniqueBrands = [...new Set(brands)]
    return uniqueBrands.length
  }

  const sliceTag = (array, start, end) => {
    const slicedArray = array.slice(start, end)
    return slicedArray
  }

  return (
    <Fragment>
      <div className={styles.tagsContainer}>
        <h4 className={styles.header}>{header}</h4>
        <div className={styles.content}>
          <SearchBox
            type="text"
            name="name"
            placeholder={`    Search brand`}
            searchChange={searchfield}
          />
          <div style={{ height: window.innerHeight / 30 }}></div>
          <div className={styles.tags}>
            <div className={styles.tagsWrapper}>
              <input
                type="checkbox"
                className={styles.inputTag}
                id={header === 'Brands' ? 'allBrands' : 'allTags'}
                onClick={selectAll}
              />
              <label
                className={styles.searchTag}
                for={header === 'Brands' ? 'allBrands' : 'allTags'}
              >
                All{' '}
                <span className={styles.nameCount}>
                  (
                  {header === 'Brands'
                    ? brandsTotalCount(productsData)
                    : productsTotalTagCount(productsData).length}
                  )
                </span>
              </label>
            </div>
            {inputData.map((tag, index) => {
              return (
                <Fragment>
                  <div className={styles.tagsWrapper}>
                    <input
                      type="checkbox"
                      onClick={inputEvent}
                      name={tag.slug ? tag.slug : tag}
                      id={tag.slug ? tag.slug : tag}
                    />
                    <label
                      key={index}
                      className={styles.searchTag}
                      for={tag.slug ? tag.slug : tag}
                    >
                      {tag.slug
                        ? tag.slug.length > 20
                          ? sliceTag(tag.slug, 0, 17) + '...'
                          : tag.slug
                        : tag}
                    </label>{' '}
                    <span className={styles.nameCount}>
                      (
                      {tag.slug
                        ? sameNameCountBrands(productsData, tag.slug)
                        : sameNameCountTags(tag)}
                      )
                    </span>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FilterComponent

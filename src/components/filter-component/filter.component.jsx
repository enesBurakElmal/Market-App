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
  const sameNameCountTags = (tag) => {
    const count = productsData.filter((item) => item.tags.includes(tag))
    return count.length
  }

  const sameNameCountBrands = (tag) => {
    const count = productsData.filter((item) => item.manufacturer === tag)
    return count.length
  }

  const productsTotalTagCount = () => {
    const tagCount = productsData.map((item) => item.tags)
    const tagCountFlat = tagCount.flat()
    const uniqueTags = [...new Set(tagCountFlat)]
    return uniqueTags
  }

  const brandsTotalCount = () => {
    const brands = productsData.map((item) => item.manufacturer)
    const uniqueBrands = [...new Set(brands)]
    return uniqueBrands.length
  }

  const sliceTag = (value, start, end) => {
    const slicedArray = value.slice(start, end)
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
            placeholder={
              header === 'Tags' ? '    Search tags' : '    Search brands'
            }
            searchChange={searchfield}
          />
          <div style={{ height: window.innerHeight / 30 }} />
          <ul className={styles.tags}>
            <li className={styles.tagsWrapper}>
              <input
                type="checkbox"
                className={styles.inputTag}
                id={header === 'Brands' ? 'allBrands' : 'allTags'}
                onClick={selectAll}
              />
              <label
                className={styles.searchTag}
                htmlFor={header === 'Brands' ? 'allBrands' : 'allTags'}
              >
                All{' '}
                <span className={styles.nameCount}>
                  (
                  {header === 'Brands'
                    ? brandsTotalCount()
                    : productsTotalTagCount().length}
                  )
                </span>
              </label>
            </li>
            {/* <label for="products" className={styles.inputTag}>
              {header === 'Brands' ? 'Brands' : 'Tags'}
            </label> */}
            {/* <select
              name="products"
              id={header === 'Brands' ? 'allBrands' : 'allTags'}
            > */}
            {inputData.map((tag, index) => {
              return (
                <Fragment>
                  <li className={styles.tagsWrapper} key={index}>
                    <input
                      type="checkbox"
                      onClick={inputEvent}
                      name={tag.slug ? tag.slug : tag}
                      id={tag.slug ? tag.slug : tag}
                      disabled={
                        header === 'Brands'
                          ? sameNameCountBrands(tag.slug) === 0
                          : sameNameCountTags(tag) === 0
                      }
                    />
                    <label
                      className={styles.searchTag}
                      htmlFor={tag.slug ? tag.slug : tag}
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
                        ? sameNameCountBrands(tag.slug)
                        : sameNameCountTags(tag)}
                      )
                    </span>
                  </li>

                  {/* <li className={styles.tagsWrapper} key={index}>
                      <option value="enn" id={tag.slug ? tag.slug : tag}>
                        {tag.slug ? tag.slug : tag}
                      </option>
                    </li> */}
                </Fragment>
              )
            })}
            {/* </select> */}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default FilterComponent

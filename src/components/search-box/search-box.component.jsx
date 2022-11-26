import React, { Fragment } from 'react'

import styles from './search-box.module.scss'

const SearchBox = ({ searchChange, placeholder }) => {
  return (
    <Fragment>
      <input
        className={styles.search}
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={searchChange}
      />
    </Fragment>
  )
}

export default SearchBox

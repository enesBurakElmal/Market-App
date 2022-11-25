import React, { Fragment } from 'react'

const SearchBox = ({ searchChange }) => {
  return (
    <Fragment>
      <input
        className="searchInput"
        type="text"
        name="name"
        placeholder="Search"
        onChange={searchChange}
      />
    </Fragment>
  )
}

export default SearchBox

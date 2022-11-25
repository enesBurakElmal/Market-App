import React, { useContext, useState } from 'react'

import { CartContext } from '../../contexts/cart-item.context'
import RadioInput from '../radio-button/radio-button.component'
import styles from './sorting-component.module.scss'

const SortingComponent = (sorting) => {
  // const [favorite, setFavorite] = useState('')
  const { lowToHigh } = useContext(CartContext)
  const [selectedInput, setSelectedInput] = useState('')

  const handleLowToHigh = () => {
    lowToHigh(sorting)
    // setFavorite('lowToHigh')
  }

  // const handleHighToLow = () => {
  //   highToLow(sorting)
  //   setFavorite('highToLow')
  // }

  // const handleNewToOld = () => {
  //   // tagFilter(sorting)
  //   setFavorite('newToOld')
  // }

  // const handleOldToNew = () => {
  //   setFavorite('oldToNew')
  // }

  const handleChange = (inputValue) => {
    setSelectedInput(inputValue)
  }
  return (
    <div>
      <h4 className={styles.header}> Sorting</h4>
      <div style={{ height: window.innerHeight / 100 }} />
      <div className={styles.leftContent}>
        <RadioInput
          name="sorting"
          value="lowToHigh2"
          label="Price low to high"
          // onChange={handleLowToHigh}
          isChecked={selectedInput === 'lowToHigh2'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="highToLow2"
          label="Price high to low"
          onChange={handleLowToHigh}
          isChecked={selectedInput === 'highToLow2'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="enes"
          label="Price low to high"
          onChange={handleLowToHigh}
          isChecked={selectedInput === 'enes'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="lowToHight"
          label="Price low to high"
          onChange={handleLowToHigh}
          isChecked={selectedInput === 'lowToHigh'}
          handleChange={handleChange}
        />
        {/* <span>✓</span> */}
        {/* <RadioButton
          label="Price high to low"
          value={favorite === 'highToLow'}
          onChange={handleHighToLow}
        />
        <RadioButton
          label="New to old"
          value={favorite === 'newToOld'}
          onChange={handleNewToOld}
        />
        <RadioButton
          label="Old to new"
          value={favorite === 'oldToNew'}
          onChange={handleOldToNew}
        /> */}
        {/* <RadioButton label="Old to new" value={value} onChange={handleChange} /> */}
      </div>
    </div>
  )
}

export default SortingComponent

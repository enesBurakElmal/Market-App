import React, { useContext, useState } from 'react'

import { CartContext } from '../../contexts/cart-item.context'
import RadioInput from '../radio-button/radio-button.component'
import styles from './sorting-component.module.scss'

const SortingComponent = () => {
  const { lowToHigh, highToLow, products, newToOld, oldToNew } =
    useContext(CartContext)
  const [selectedInput, setSelectedInput] = useState('')

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
          value="lowToHigh"
          label="Price low to high"
          onClick={() => lowToHigh(products)}
          isChecked={selectedInput === 'lowToHigh'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="highToLow"
          label="Price high to low"
          onClick={() => highToLow(products)}
          isChecked={selectedInput === 'highToLow'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="newToOld"
          label="New to old"
          onClick={() => newToOld(products)}
          isChecked={selectedInput === 'newToOld'}
          handleChange={handleChange}
        />
        <RadioInput
          name="sorting"
          value="oldToNew"
          label="Old to new"
          onClick={() => oldToNew(products)}
          isChecked={selectedInput === 'oldToNew'}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SortingComponent

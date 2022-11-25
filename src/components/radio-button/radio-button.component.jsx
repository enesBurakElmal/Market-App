import styles from './radio-button.module.scss'

const RadioInput = ({ name, label, value, isChecked, handleChange }) => {
  const handleRadioChange = (e) => {
    const { id } = e.currentTarget
    handleChange(id)
  }

  return (
    <div className={styles.radioContent}>
      <input
        type="radio"
        className={styles.custom__radio}
        name={name}
        id={value}
        checked={isChecked}
        onChange={handleRadioChange}
      />
      <label htmlFor={value} className={styles.label}>
        <span>{label}</span>
      </label>
    </div>
  )
}

export default RadioInput

import { createContext, useState, useEffect } from 'react'

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  console.log(categoriesMap)

  useEffect(() => {
    const getCategoriesMap = () => {
      const categoriesMap = (categories) => {
        return categories.reduce((acc, category) => {
          acc[category.id] = category
          return acc
        }, {})
      }
      return categoriesMap
    }
    setCategoriesMap(getCategoriesMap())
  }, [])

  const value = { categoriesMap }
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

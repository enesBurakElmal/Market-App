import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import companiesJson from '../companies'
import itemsJson from '../items'

export let allProducts = []
const productsUrl = 'http://localhost:3001/items'
const companiesUrl = 'http://market-workspace.netlify.app/companies.json'
let config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
}

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.added === productToAdd.added
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.added === productToAdd.added
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.added === cartItemToRemove.added
  )

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.added !== cartItemToRemove.added
    )
  }

  return cartItems.map((cartItem) =>
    cartItem.added === cartItemToRemove.added
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.added !== cartItemToClear.added)

const currentPageProducts = (products, page) => {
  const startIndex = (page - 1) * 16
  const endIndex = page * 16
  const productsToDisplay = products.slice(startIndex, endIndex)
  return productsToDisplay
}
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  brandsFilter: () => {},
  cartCount: 0,
  cartTotal: 0,
  products: [],
  setProducts: () => {},
  setPaginationItems: () => {},
  paginationItems: [],
  lowToHigh: () => {},
  pageCount: 0,
  currentPage: 1,
  setPageCount: () => {},
  setCurrentPage: () => {},
  currentPageProducts: () => {},
  lowToHighFilter: () => {},
  setSearchfield: () => {},
  highToLow: () => {},
  tagFilter: () => {},
  setTagField: () => {},
  productsTags: [],
  companies: [],
  newToOld: () => {},
  oldToNew: () => {},
  selectMugOrShirt: () => {},
  setProductsTags: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [companies, setCompanies] = useState([])
  const [paginationItems, setPaginationItems] = useState([])
  const [productsTags, setProductsTags] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [searchfield, setSearchfield] = useState('')
  const [tagField, setTagField] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const newCartTotal = cartItems
      .reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2)
    setCartTotal(newCartTotal)
  }, [cartItems])

  useEffect(() => {
    axios
      .get(productsUrl)
      .then((response) => {
        setProducts(response.data)
        allProducts = response.data
        // setPageCount(Math.ceil(response.data.length / 16))
      })
      .catch((error) => {
        console.log(error, 'err from products data fetch with app-context')
      })
  }, [])

  useEffect(() => {
    setProducts(itemsJson)
    setCompanies(companiesJson)
    allProducts = itemsJson
    setPageCount(Math.ceil(products.length / 16))
  }, [products, companies])

  useEffect(() => {
    setPaginationItems(currentPageProducts(products, currentPage))
    setPageCount(Math.ceil(products.length / 16))
  }, [products, currentPage])

  useEffect(() => {
    const productTags = allProducts.map((product) => product.tags)
    const tags = productTags.flat()
    const uniqueTags = [...new Set(tags)]
    setProductsTags(uniqueTags)
  }, [products])
  const tagFilter = (tag) => {
    setTagField(tag)
  }

  const slugs = companies.map((company) => company.slug.toLowerCase())

  const inputFilterCompaniesSlug = () => {
    const filterWithSlug = slugs.filter((slug) =>
      slug.includes(tagField.toLowerCase())
    )
    const tagsFilterProducts = allProducts.filter((product) =>
      filterWithSlug.includes(product.slug.toLowerCase())
    )

    // const filterWithSlugCompaniesId = filterWithSlugCompanies.map(
    //   (company) => company.added
    // )
    // const filterWithSlugProducts = allProducts.filter((product) =>
    //   filterWithSlugCompaniesId.includes(product.companyId)
    // )
    console.log(filterWithSlug, 'kekw')
  }

  // console.log(companiesSlug, 'companiesSlug', filteredProductsSlug, '2')
  // console.log(filteredProductsSlug)
  // return filteredProductsSlug
  // inputFilterCompaniesSlug()

  useEffect(() => {
    if (tagField === '') {
      setProducts(allProducts)
      // setPageCount(Math.ceil(allProducts.length / 16))
    } else {
      const filteredProducts = inputFilterCompaniesSlug()
      // console.log(filteredProducts)
      // setPaginationItems(currentPageProducts(filteredProducts, currentPage))
      // setPageCount(Math.ceil(filteredProducts.length / 16))
      // setProducts(filterOnTags())
    }
  }, [tagField])

  const brandsFilter = (searchfield) => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchfield.toLowerCase())
    )
    setPaginationItems(currentPageProducts(filteredProducts, currentPage))
    setPageCount(Math.ceil(filteredProducts.length / 16))
  }

  const selectMugOrShirt = (label) => {
    const selectMugs = products.filter((product) => product.itemType === 'mug')
    const selectShirts = products.filter(
      (product) => product.itemType === 'shirt'
    )
    if (label === 'mug') {
      setPaginationItems(currentPageProducts(selectMugs, currentPage))
    } else {
      setPaginationItems(currentPageProducts(selectShirts, currentPage))
    }
  }

  const lowToHigh = (products) => {
    const sortedProducts = products.sort((a, b) => a.price - b.price)
    setPaginationItems(currentPageProducts(sortedProducts, currentPage))
  }

  const highToLow = (products) => {
    const sortedProducts = products.sort((a, b) => b.price - a.price)
    setPaginationItems(currentPageProducts(sortedProducts, currentPage))
  }

  const newToOld = (products) => {
    const sortedProducts = products.sort((a, b) => b.added - a.added)
    setPaginationItems(currentPageProducts(sortedProducts, currentPage))
  }

  const oldToNew = (products) => {
    const sortedProducts = products.sort((a, b) => a.added - b.added)
    setPaginationItems(currentPageProducts(sortedProducts, currentPage))
  }

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    brandsFilter,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
    setProducts,
    setPaginationItems,
    paginationItems,
    products,
    lowToHigh,
    pageCount,
    currentPage,
    setCurrentPage,
    setPageCount,
    currentPageProducts,
    setSearchfield,
    highToLow,
    tagFilter,
    setTagField,
    productsTags,
    setCartCount,
    companies,
    newToOld,
    oldToNew,
    selectMugOrShirt,
    setProductsTags,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

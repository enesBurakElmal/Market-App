import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export let allProducts = []
const productsUrl = 'http://localhost:3001/items'
const companiesUrl = 'http://localhost:3002/companies'

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

const getProductTags = (arr) => {
  const productTags = arr.map((product) => product.tags)
  const tags = productTags.flat()
  let uniqueTags = [...new Set(tags)]
  return uniqueTags
}

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
  tagfield: '',
  setTagfield: () => {},
  productsTags: [],
  companies: [],
  newToOld: () => {},
  oldToNew: () => {},
  filterWithItemTypes: () => {},
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
  const [tagfield, setTagfield] = useState('')
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
    axios
      .get(companiesUrl)
      .then((response) => {
        setCompanies(response.data)
      })
      .catch((error) => {
        console.log(error, 'err from companies data fetch with app-context')
      })
  }, [])

  useEffect(() => {
    setProductsTags(getProductTags(allProducts))
    setPaginationItems(currentPageProducts(products, currentPage))
    setPageCount(Math.ceil(products.length / 16))
  }, [products, currentPage])

  console.log('productsTags')

  const tagFilter = (tag) => {
    setTagfield(tag)
  }
  const slugs = companies.map((company) => company.slug.toLowerCase())

  const inputFilterCompaniesSlug = () => {
    const filterWithSlug = slugs.filter((slug) =>
      slug.includes(tagfield.toLowerCase())
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

  // useEffect(() => {
  //   if (tagField === '') {
  //     // setProducts(allProducts)
  //     // setPageCount(Math.ceil(allProducts.length / 16))
  //   } else {
  //     const filteredProducts = inputFilterCompaniesSlug()
  //     // console.log(filteredProducts)
  //     // setPaginationItems(currentPageProducts(filteredProducts, currentPage))
  //     // setPageCount(Math.ceil(filteredProducts.length / 16))
  //     // setProducts(filterOnTags())
  //   }
  // }, [tagField])

  const brandsFilter = (searchfield) => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchfield.toLowerCase())
    )
    setProducts(filteredProducts)
    setPageCount(Math.ceil(filteredProducts.length / 16))
  }

  const filterWithItemTypes = (label) => {
    const filteredProducts = allProducts.filter(
      (product) => product.itemType === label
    )
    setProducts(filteredProducts)
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
    tagfield,
    setTagfield,
    productsTags,
    setCartCount,
    companies,
    newToOld,
    oldToNew,
    filterWithItemTypes,
    setProductsTags,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

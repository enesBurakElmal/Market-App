import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

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

const lowToHighFilter = (products) => {
  const sortedProducts = products.sort((a, b) => a.price - b.price)
  return sortedProducts
}

const highToLowFilter = (products) => {
  const sortedProducts = products.sort((a, b) => b.price - a.price)
  return sortedProducts
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.added !== cartItemToClear.added)

const filterScript = (products, searchfield) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchfield.toLowerCase())
  )
  return filteredProducts
}

// const filterOnTags = (products, tags) => {
//   const filteredProductTags = products.filter((item) => {
//     return [item.tags.includes(tags)]
//   })
//   console.log(filteredProductTags, 'current products after search')
//   return filteredProductTags
// }

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  filteredTags: () => {},
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
  const [tagField, setTagField] = useState('') //buradan devam edilecek, fonksiyonlardaki searchfieldler duzeltilecek,  tags componenti de ayni sekilde
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
  console.log('products')
  useEffect(() => {
    axios
      .get(productsUrl)
      .then((response) => {
        setProducts(response.data)
        setPageCount(Math.ceil(response.data.length / 16))
        console.log(response.data, 'products')
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
  // useEffect(() => {
  //   setProducts(products)
  //   // setPaginationItems(products)
  //   // setPageCount(Math.ceil(products.length / 16))
  // }, [products])
  useEffect(() => {
    const productTags = products.map((product) => product.tags)
    const tags = productTags.flat()
    const uniqueTags = [...new Set(tags)]
    setProductsTags(uniqueTags)
  }, [products])

  const filterOnTags = (products, tag) => {
    const filteredProducts = products.filter((product) =>
      product.tags.includes(tag)
    )
    return filteredProducts
  }
  const currentPageProducts = (products, page) => {
    const startIndex = (page - 1) * 16
    const endIndex = page * 16
    const productsToDisplay = products.slice(startIndex, endIndex)
    return productsToDisplay
  }
  useEffect(() => {
    setPaginationItems(currentPageProducts(products, currentPage))
  }, [products, currentPage])

  useEffect(() => {
    if (searchfield === '') {
      setProducts(products)
      // setPageCount(Math.ceil(products / 16))
    }
    if (searchfield !== '') {
      setProducts(filterScript(products, searchfield))
      // setPageCount(Math.ceil(filterScript(products, searchfield).length / 16))
    }
  }, [searchfield, products])

  useEffect(() => {
    if (tagField === '') {
      setProducts(products)
    }
    if (tagField !== '') {
      setProducts(filterOnTags(products, tagField))
      setPageCount(Math.ceil(filterOnTags(products, tagField).length / 16))
    }
  }, [tagField, products])

  const tagFilter = (tag) => {
    setTagField(filterOnTags(products, tag))
    setProducts(filterOnTags(products, tag))
  }

  const filteredTags = (onFilter) => {
    setSearchfield(filterScript(products, onFilter))
    setProducts(filterScript(products, onFilter))
  }

  const lowToHigh = (productLowToHigh) => {
    const sortedProducts = lowToHighFilter(products)
    setProducts(sortedProducts, productLowToHigh)
  }

  const highToLow = (productHighToLow) => {
    const sortedProducts = highToLowFilter(products)
    setProducts(sortedProducts, productHighToLow)
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
    filteredTags,
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
    lowToHighFilter,
    setSearchfield,
    highToLow,
    tagFilter,
    setTagField,
    productsTags,
    setCartCount,
    companies,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

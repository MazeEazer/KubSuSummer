import React, { useCallback, useMemo, useEffect, useState } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import ThemeToggle from "./components/ThemeToggle"
import AppContext from "./context"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"
import Product from "./pages/Product"
import Auth from "./pages/Auth"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    const sneakers = [
      {
        id: 1,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/1.jpg",
        price: 12999,
        gender: "male",
        category: "casual",
        season: "all",
        color: "white",
      },
      {
        id: 2,
        title: "Мужские Кроссовки Nike Air Max 270",
        imageUrl: "/img/sneakers/2.jpg",
        price: 15600,
        gender: "male",
        category: "sport",
        season: "summer",
        color: "black",
      },
      {
        id: 3,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/3.jpg",
        price: 8499,
        gender: "male",
        category: "casual",
        season: "winter",
        color: "red",
      },
      {
        id: 4,
        title: "Кроссовки Puma X Aka Boku Future Rider",
        imageUrl: "/img/sneakers/4.jpg",
        price: 8999,
        gender: "male",
        category: "sport",
        season: "summer",
        color: "blue",
      },
      {
        id: 5,
        title: "Мужские Кроссовки Under Armour Curry 8",
        imageUrl: "/img/sneakers/5.jpg",
        price: 15199,
        gender: "female",
        category: "sport",
        season: "all",
        color: "black",
      },
      {
        id: 6,
        title: "Мужские Кроссовки Nike Kyrie 7",
        imageUrl: "/img/sneakers/6.jpg",
        price: 11299,
        gender: "male",
        category: "sport",
        season: "summer",
        color: "white",
      },
      {
        id: 7,
        title: "Мужские Кроссовки Jordan Air Jordan 11",
        imageUrl: "/img/sneakers/7.jpg",
        price: 10799,
        gender: "male",
        category: "sport",
        season: "all",
        color: "red",
      },
      {
        id: 8,
        title: "Мужские Кроссовки Nike LeBron XVIII",
        imageUrl: "/img/sneakers/8.jpg",
        price: 16499,
        gender: "male",
        category: "sport",
        season: "winter",
        color: "black",
      },
      {
        id: 9,
        title: "Мужские Кроссовки Nike Lebron XVIII Low",
        imageUrl: "/img/sneakers/9.jpg",
        price: 13999,
        gender: "male",
        category: "casual",
        season: "summer",
        color: "blue",
      },
      {
        id: 10,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/10.jpg",
        price: 8499,
        gender: "male",
        category: "casual",
        season: "all",
        color: "white",
      },
    ]

    setItems(sneakers)
    setIsLoading(false)
  }, [])

  const onAddToCart = useCallback(
    (obj) => {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
      } else {
        setCartItems((prev) => [...prev, { ...obj, id: Date.now() }])
      }
    },
    [cartItems]
  )

  const onRemoveItem = useCallback((id) => {
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    )
  }, [])

  const onAddToFavorite = useCallback(
    (obj) => {
      const exists = favorites.find((fav) => fav.id === obj.id)
      if (exists) {
        setFavorites((prev) => prev.filter((fav) => fav.id !== obj.id))
      } else {
        setFavorites((prev) => [...prev, obj])
      }
    },
    [favorites]
  )

  const onChangeSearchInput = useCallback((event) => {
    setSearchValue(event.target.value)
  }, [])

  const isItemAdded = useCallback(
    (id) => {
      return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    },
    [cartItems]
  )

  const contextValue = useMemo(
    () => ({
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems,
      isAuthenticated,
      setIsAuthenticated,
    }),
    [
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      isAuthenticated,
    ]
  )

  return (
    <AppContext.Provider value={contextValue}>
      <div className="wrapper clear">
        <ThemeToggle />
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/orders"
            element={
              isAuthenticated ? (
                <Orders />
              ) : (
                <Navigate to="/auth" state={{ from: "/orders" }} replace />
              )
            }
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App

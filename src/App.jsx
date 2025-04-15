import React, { useCallback, useMemo, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import AppContext from "./context"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"
import Product from "./pages/Product"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sneakers = [
      {
        id: 1,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/1.jpg",
        price: 12999,
      },
      {
        id: 2,
        title: "Мужские Кроссовки Nike Air Max 270",
        imageUrl: "/img/sneakers/2.jpg",
        price: 15600,
      },
      {
        id: 3,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/3.jpg",
        price: 8499,
      },
      {
        id: 4,
        title: "Кроссовки Puma X Aka Boku Future Rider",
        imageUrl: "/img/sneakers/4.jpg",
        price: 8999,
      },
      {
        id: 5,
        title: "Мужские Кроссовки Under Armour Curry 8",
        imageUrl: "/img/sneakers/5.jpg",
        price: 15199,
      },
      {
        id: 6,
        title: "Мужские Кроссовки Nike Kyrie 7",
        imageUrl: "/img/sneakers/6.jpg",
        price: 11299,
      },
      {
        id: 7,
        title: "Мужские Кроссовки Jordan Air Jordan 11",
        imageUrl: "/img/sneakers/7.jpg",
        price: 10799,
      },
      {
        id: 8,
        title: "Мужские Кроссовки Nike LeBron XVIII",
        imageUrl: "/img/sneakers/8.jpg",
        price: 16499,
      },
      {
        id: 9,
        title: "Мужские Кроссовки Nike Lebron XVIII Low",
        imageUrl: "/img/sneakers/9.jpg",
        price: 13999,
      },
      {
        id: 10,
        title: "Мужские Кроссовки Nike Blazer Mid Suede",
        imageUrl: "/img/sneakers/10.jpg",
        price: 8499,
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
    }),
    [items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart]
  )

  return (
    <AppContext.Provider value={contextValue}>
      <div className="wrapper clear">
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
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App

import React, { useCallback, useMemo, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import AppContext from "./context"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // ⚡ Заменяем axios на локальные данные
  useEffect(() => {
    const localItems = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Кроссовки №${i + 1}`,
      price: 100 + i * 10,
      imageUrl: `/img/${i + 1}.jpg`,
      parentId: i + 1,
    }))

    setItems(localItems)
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
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App

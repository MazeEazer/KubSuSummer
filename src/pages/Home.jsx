import React from "react"
import Card from "../components/Card"

function Home({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
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

  const renderItems = () => {
    const filteredItems = sneakers.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home

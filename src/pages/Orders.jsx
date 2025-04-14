import React from "react"

import Card from "../components/Card"
import AppContext from "../context"

function Orders() {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Фейковые данные, эмулируем заказы (2 заказа по 2 товара)
    const fakeOrders = [
      {
        id: 1,
        items: [
          {
            id: 1,
            parentId: 1,
            title: "Кроссовки №1",
            imageUrl: "img/sneakers/1.jpg",
            price: 120,
          },
          {
            id: 2,
            parentId: 2,
            title: "Кроссовки №2",
            imageUrl: "/img/sneakers/2.jpg",
            price: 130,
          },
        ],
      },
      {
        id: 2,
        items: [
          {
            id: 3,
            parentId: 3,
            title: "Кроссовки №3",
            imageUrl: "/img/sneakers/3.jpg",
            price: 140,
          },
          {
            id: 4,
            parentId: 4,
            title: "Кроссовки №4",
            imageUrl: "/img/sneakers/4.jpg",
            price: 150,
          },
        ],
      },
    ]

    // Объединяем все товары из заказов в один массив
    const allItems = fakeOrders.reduce(
      (acc, order) => [...acc, ...order.items],
      []
    )

    setOrders(allItems)
    setIsLoading(false)
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Orders

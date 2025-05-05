import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context"
import { useCart } from "../hooks/useCart"

function Orders() {
  const { cartItems } = useContext(AppContext)
  const { totalPrice } = useCart()
  const [orderStatus, setOrderStatus] = useState("")

  const handleOrder = () => {
    setOrderStatus("Заказ оформлен")
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="cartItems">
        {cartItems.map((item) => (
          <div key={item.id} className="cartItem d-flex align-center mb-20">
            <div
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">{item.title}</p>
              <b>{item.price} руб.</b>
            </div>
          </div>
        ))}
      </div>

      <div className="cartTotalBlock">
        <ul>
          <li>
            <span>Итого:</span>
            <div></div>
            <b>{totalPrice} руб.</b>
          </li>
        </ul>
        <button
          onClick={handleOrder}
          className="greenButton"
          disabled={cartItems.length === 0}
        >
          Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
        </button>
        {orderStatus && <div className="notification">{orderStatus}</div>}
      </div>
    </div>
  )
}

export default Orders

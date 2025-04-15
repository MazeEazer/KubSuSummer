import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AppContext from "../context"

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, onAddToCart } = React.useContext(AppContext)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedGender, setSelectedGender] = useState("unisex")
  const [showNotification, setShowNotification] = useState(false)

  const product = items.find((item) => item.id === Number(id))

  if (!product) {
    return <div>Товар не найден</div>
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер")
      return
    }

    onAddToCart({
      ...product,
      size: selectedSize,
      gender: selectedGender,
    })

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="product">
      <div className="product__header">
        <button onClick={() => navigate(-1)} className="product__back">
          <img src="/img/btn-remove.svg" alt="Back" />
        </button>
        <h1>{product.title}</h1>
      </div>

      <div className="product__content">
        <div className="product__image">
          <img src={product.imageUrl} alt={product.title} />
        </div>

        <div className="product__info">
          <div className="product__price">{product.price} руб.</div>

          <div className="product__section">
            <h3>Размер</h3>
            <div className="product__sizes">
              {[38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
                <button
                  key={size}
                  className={`product__size ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product__section">
            <h3>Пол</h3>
            <div className="product__genders">
              <button
                className={`product__gender ${
                  selectedGender === "male" ? "active" : ""
                }`}
                onClick={() => setSelectedGender("male")}
              >
                Мужской
              </button>
              <button
                className={`product__gender ${
                  selectedGender === "female" ? "active" : ""
                }`}
                onClick={() => setSelectedGender("female")}
              >
                Женский
              </button>
              <button
                className={`product__gender ${
                  selectedGender === "unisex" ? "active" : ""
                }`}
                onClick={() => setSelectedGender("unisex")}
              >
                Унисекс
              </button>
            </div>
          </div>

          <div className="product__section">
            <h3>Категория</h3>
            <p>Спортивные</p>
          </div>

          <div className="product__section">
            <h3>Сезонность</h3>
            <p>Всесезонные</p>
          </div>

          <div className="product__section">
            <h3>Материалы</h3>
            <p>Искусственная кожа, текстиль, резина</p>
          </div>

          <button className="greenButton" onClick={handleAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>

      {showNotification && (
        <div className="notification">Товар добавлен в корзину!</div>
      )}
    </div>
  )
}

export default Product

import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import AppContext from "../context"

function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { setIsAuthenticated } = React.useContext(AppContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Проверка учетных данных
    if (
      formData.username === "user" &&
      formData.email === "user123@gmail.com" &&
      formData.password === "123"
    ) {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
      // Перенаправление на предыдущую страницу или на страницу заказов
      const from = location.state?.from || "/orders"
      navigate(from, { replace: true })
    } else {
      setError("Неверные учетные данные")
    }
  }

  return (
    <div className="content p-40">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Вход в аккаунт</h2>

        <div className={`form-group ${error ? "error" : ""}`}>
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Введите имя пользователя"
            required
          />
        </div>

        <div className={`form-group ${error ? "error" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите email"
            required
          />
        </div>

        <div className={`form-group ${error ? "error" : ""}`}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <button type="submit" className="submit-button">
          Войти
        </button>

        <div className="form-footer">
          <p>
            Тестовые данные для входа:
            <br />
            Имя пользователя: user
            <br />
            Email: user123@gmail.com
            <br />
            Пароль: 123
          </p>
        </div>
      </form>
    </div>
  )
}

export default Auth

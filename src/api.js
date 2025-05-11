// src/api.js
const API_URL = "https://jsonplaceholder.typicode.com"

// Имитация API для нашего магазина
export const api = {
  // Получение списка товаров
  async getProducts() {
    try {
      // В реальном приложении здесь был бы ваш настоящий эндпоинт
      // Используем JSONPlaceholder для имитации
      const response = await fetch(`${API_URL}/photos?_limit=10`)
      const data = await response.json()

      // Преобразуем данные в формат нашего приложения
      return data.map((item, index) => ({
        id: item.id,
        title: `Кроссовки ${item.title.split(" ")[0]}`,
        imageUrl: item.url,
        price: Math.floor(Math.random() * 10000) + 5000,
        gender: index % 2 === 0 ? "male" : "female",
        category: index % 3 === 0 ? "sport" : "casual",
        season: ["summer", "winter", "all"][index % 3],
        color: ["black", "white", "red", "blue", "green"][index % 5],
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  },

  // Авторизация пользователя
  async login(email, password) {
    try {
      // Имитация запроса на сервер
      const response = await fetch(`${API_URL}/users/1`)
      const user = await response.json()

      // Простая проверка пароля для демонстрации
      if (email === "user123@gmail.com" && password === "123") {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          token: "fake-jwt-token",
        }
      }
      throw new Error("Неверный email или пароль")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Регистрация пользователя
  async register(username, email, password) {
    try {
      // Имитация запроса на сервер
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
      const data = await response.json()
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        token: "fake-jwt-token",
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  // Обновление корзины пользователя (имитация)
  async updateCart(userId, cartItems) {
    try {
      // В реальном приложении здесь был бы запрос к вашему бэкенду
      console.log(`Updating cart for user ${userId}`, cartItems)
      await new Promise((resolve) => setTimeout(resolve, 500)) // Имитация задержки сети
      return { success: true }
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error
    }
  },
}

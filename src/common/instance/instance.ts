import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error.config
//
//     if (!config || config._retry) {
//       return Promise.reject(error)
//     }
//
//     // только для сетевых ошибок
//     if (error.code !== "ERR_NETWORK") {
//       return Promise.reject(error)
//     }
//
//     config._retry = true
//
//     await new Promise((res) => setTimeout(res, 1000))
//
//     return instance(config)
//   },
// )

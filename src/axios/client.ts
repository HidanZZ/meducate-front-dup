import axios from 'axios'

// Create an instance of axios with default configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API URL from env
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config: any) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default apiClient

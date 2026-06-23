import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://applysmart-1-jhr4.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL.trim()
})

export default api

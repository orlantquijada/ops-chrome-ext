import axiosInstance from 'axios'

const axios = axiosInstance.create({
  // baseURL: 'https://ops-api-production.up.railway.app/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
})

export default axios

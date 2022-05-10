import axiosInstance from 'axios'

const axios = axiosInstance.create({
  baseURL: 'https://ops-api-production.up.railway.app/api/',
})

export default axios

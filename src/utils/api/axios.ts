import axiosInstance from 'axios'

const axios = axiosInstance.create({ baseURL: 'http://192.168.1.3:8000/api/' })

export default axios

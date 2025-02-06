import axios from 'axios'

const instance = axios.create({
    baseURL: '/',
    withCredentials: true,
    timeout: 120000, 
})
export default instance
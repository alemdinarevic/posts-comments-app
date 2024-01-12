import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: { "X-Custom-Header": "platform" },
});
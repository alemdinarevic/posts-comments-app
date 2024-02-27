import axios from 'axios'

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: { "X-Custom-Header": "platform" },
});
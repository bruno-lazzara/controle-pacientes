import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

http.interceptors.request.use(config => {
    config.headers['x-access-token'] = localStorage.getItem('access-token');
    return config;
})

export default http;
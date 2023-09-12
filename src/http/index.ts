import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3500'
});

export default http;
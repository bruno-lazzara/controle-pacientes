import axios from "axios";

const http = axios.create({
    baseURL: 'https://api-controle-pacientes.vercel.app'
});

export default http;
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
});

const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export default instance
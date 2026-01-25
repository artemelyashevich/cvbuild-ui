import axios, { type CreateAxiosDefaults } from 'axios';
import Cookies from "js-cookie";

const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const axiosDefault = axios.create(options);

const axiosWithToken = axios.create(options);

axiosWithToken.interceptors.request.use(config => {
    const token = Cookies.get('access_token');
    if (config?.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { axiosDefault, axiosWithToken };
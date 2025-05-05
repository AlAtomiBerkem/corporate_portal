import axios from 'axios';
import {LOCALSTORAGE_KEY} from '../utils/constants.js'
import { refresh } from "./auth.js";

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // Для куков (refreshToken)
})

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// })

api.interceptors.request.use(config => {
    // Не добавляем токен для эндпоинтов авторизации
    if (config.url.includes('/auth/')) {
        return config;
    }
    })

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { accessToken } = await refresh();
                localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch {
                localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
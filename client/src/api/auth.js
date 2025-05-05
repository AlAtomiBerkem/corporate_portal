import api from './axios.js';
import {LOCALSTORAGE_KEY} from '../utils/constants.js'

export const login = async (login, password) => {
    const {data} = await api.post('auth/login', {login, password});
    localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, data.accessToken);
    return data;
}

export const refresh = async () => {
        const {data} = await api.post('auth/refresh');
        localStorage.setItem(LOCALSTORAGE_KEY.ACCESS_TOKEN, data.accessToken);
        return data;
}

export const logout = async () => {
    await api.post('auth/logout');
    localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
}

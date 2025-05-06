import {fetchAPI, isAuthenticated} from '../api/auth.js'

export async function login(login, password) {
    const data = await fetchAPI('/auth/login', 'POST', {login, password});
    localStorage.setItem('accessToken', data.accessToken);
    return data;
}

export async function logout() {
    await fetchAPI('/auth/logout', 'POST');
    localStorage.removeItem('accessToken');
}

export async function refreshToken() {
    try {
        const data = await fetchAPI('/auth/refresh', 'POST', null, true);
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        throw error;
    }
}

export async function withAuth(fn) {
    if (!isAuthenticated()) throw new Error('Not authenticated');

    try {
        return await fn();
    } catch (error) {
        if (error.message.includes('Токен недействителен')) {
            await refreshToken();
            return await fn();
        }
        throw error;
    }
}
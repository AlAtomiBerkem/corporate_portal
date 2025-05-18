import { refreshToken } from '../utils/auth.js'

const baseUrl = 'http://localhost:5000';

export async function fetchAPI(endpoint, method = 'GET', body = null, needAuth = false) {
    const headers = {};

    if (body && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (needAuth) {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token');
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
        credentials: 'include',
        body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : null
    };

    let response = await fetch(`${baseUrl}${endpoint}`, options);

    // Первым делом проверяем 401 ошибку
    if (response.status === 401 && needAuth) {
        // Пробуем обновить токен
        const newToken = await refreshToken();
        headers['Authorization'] = `Bearer ${newToken}`;

        // Повторяем запрос с новым токеном
        response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers: { ...headers }
        });
    }

    // Затем уже проверяем другие ошибки
    const contentLength = response.headers.get('content-length');
    if (response.status === 204 || contentLength === '0') return null;

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
}

export function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
}
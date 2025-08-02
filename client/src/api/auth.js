import { refreshToken } from '../helpers/Auth.js'

// Автоматически определяем API URL в зависимости от окружения
const baseUrl = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://ir-kazan.ru/api');

export async function fetchAPI(endpoint, method = 'GET', body = null, needAuth = false, isFileDownload = false) {
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

    // Для скачивания файлов возвращаем blob
    if (isFileDownload) {
        return response.blob();
    }

    // Для обычных запросов возвращаем JSON
    return response.json();
}

export async function downloadFile(endpoint, filename, needAuth = false) {
    try {
        const blob = await fetchAPI(endpoint, 'GET', null, needAuth, true);

        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Очистка
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        return true;
    } catch (error) {
        console.error('Download error:', error);
        throw error;
    }
}

export function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
}
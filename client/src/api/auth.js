const baseUrl = 'http://localhost:5000';

export async function fetchAPI(endpoint, method = 'GET', body = null, needAuth = false) {
    const headers = {};

    if (body) headers['Content-Type'] = 'application/json';
    if (needAuth) {
        const token = localStorage.getItem('accessToken');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: 'include' // Для куков с refreshToken
    });

    const contentLength = response.headers.get('content-length');
    if (response.status === 204 || contentLength === '0') return null


    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

export function isAuthenticated() {
    return !!localStorage.getItem('accessToken');
}
import {fetchAPI} from './auth.js'
const baseUrl = 'http://localhost:5000';

export const publicApi = {
    getNews: async () => await fetchAPI('/public/news'),
    getLegalArticle: async () => await fetchAPI('/public/legal'),
    getContent: async () => await fetchAPI('/public/content'),
    getLoadingDocuments: async (fileName) => {
        try {
            const response = await fetch(`${baseUrl}/public/dock/${fileName}`, {
                method: 'GET',
                credentials: 'include'
            });

            // Проверяем content-type ответа
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                // Это JSON ошибка
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка скачивания');
            } else {
                // Это файл
                return await response.blob();
            }
        } catch (error) {
            console.error('Download error:', error);
            throw error;
        }
    },    getDocuments: async () => await fetchAPI('/public/docks')
};
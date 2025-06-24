import {fetchAPI} from './auth.js'
const baseUrl = 'http://localhost:5000';

export const publicApi = {
    getNews: async () => await fetchAPI('/public/news'),
    getLegalArticle: async () => await fetchAPI('/public/legal'),
    getContent: async () => await fetchAPI('/public/content'),
    getLoadingDocuments: async (fileId) => {
        try {
            const response = await fetch(`${baseUrl}/public/dock/${fileId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка скачивания');
            } else {
                return await response.blob();
            }
        } catch (error) {
            console.error('Download error:', error);
            throw error;
        }
    },
    getDocuments: async () => {
        const response = await fetchAPI('/public/docks');
        return response?.documents || [];
    }
};
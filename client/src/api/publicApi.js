import {fetchAPI} from './auth.js'

export const publicApi = {
    getNews: async () => await fetchAPI('/public/news'),
    getDocuments: async () => await fetchAPI('/public/docs'),
    // Остальные публичные методы
};
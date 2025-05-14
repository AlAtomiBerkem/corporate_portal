import {fetchAPI} from './auth.js'

export const publicApi = {
    getNews: async () => await fetchAPI('/public/news'),
    getLegalArticle: async () => await fetchAPI('/public/legal'),
    getContent: async () => await fetchAPI('/public/content'),
    getLoadingDocuments: async () => await fetchAPI('/public/dock/:id'),
    getDocuments: async () => await fetchAPI('/public/docks')
};
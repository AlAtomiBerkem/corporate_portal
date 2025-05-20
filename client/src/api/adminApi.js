import { fetchAPI } from "./auth.js";
import { withAuth } from "../helpers/Auth.js";

export const adminApi = {
    createNews: async (newsData) =>
        await withAuth(() => fetchAPI('/admin/create/news', 'POST', newsData, true)),

    updateNews: async (id, newsData) =>
        await withAuth(() => fetchAPI(`/admin/update/news/${id}`, 'PATCH', newsData, true)),

    deleteNews: async (id) =>
        await withAuth(() => fetchAPI(`/admin/delete/news/${id}`, 'DELETE', null, true)),

    uploadDocument: async (file, title) => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('title', title);

        return await withAuth(() => fetch('/admin/docs', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()));
    },

    deleteDocument: async (id) =>
        await withAuth(() => fetchAPI(`/admin/docs/${id}`, 'DELETE', null, true)),

    createContent: async (newContent) =>
        await withAuth(() => fetchAPI('/admin/content', 'POST', newContent, true)),

    updateContent: async (id, updateContent) =>
        await withAuth(() => fetchAPI(`/admin/content/${id}`, 'PATCH', updateContent, true)),

    deleteContent: async (id) =>
        await withAuth(() => fetchAPI(`/admin/content/${id}`, 'DELETE', null, true)),


    createLegal: async (newLegalData) =>
        await withAuth(() => fetchAPI('/admin/create/legal', 'POST', newLegalData, true)),

    updateLegal: async (legalData, id) =>
        await withAuth(() => fetchAPI(`/admin/update/legal/${id}`, 'PATCH', legalData, true)),

    deleteLegal: async (legalData, id) =>
        await withAuth(() => fetchAPI(`/admin/delete/legal/${id}`, legalData, null, true)),

};



import {fetchAPI} from "./auth.js";
import {withAuth} from "../helpers/Auth.js";

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
    }
};
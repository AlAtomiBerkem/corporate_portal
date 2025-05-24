import { useState } from "react";
import { adminApi } from "../api/adminApi.js";

export const UseDeleteData = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (type, id, dletemessage = 'Удалить этот элемент?') => {
        if(dletemessage && !window.confirm(dletemessage)) return;

        setIsDeleting(true)
        setError(null);
        console.log('залезли чюда 1')
        try {
            const apiMethod = {
                news: adminApi.deleteNews,
                document: adminApi.deleteDocument,
                legal: adminApi.deleteLegal,
                content: adminApi.deleteContent,
            }

            if (!apiMethod) throw new Error('Неверный тип элемента');

            await apiMethod[type](id);
            console.log('залезли чюда 2')

            return true;

        } catch (error) {
            setError(error.message || `Ошибка при удалении ${type}`);
            console.log('залезли чюда 3')

            return false;
        }finally {
            setIsDeleting(false);
        }
    }

    return {
        deleteItem,
        isDeleting,
        error,
        deleteNews: (id) => deleteItem('news', id),
        deleteDocument: (id) => deleteItem('document', id),
        legal: (id) => deleteItem('legal', id),
        content: (id) => deleteItem('content', id)
    }
};

export default UseDeleteData;
import { useState } from "react";
import { adminApi } from "../api/adminApi.js";

export const useDeleteData = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (type, id, confirmMessage = 'Удалить этот элемент?') => {
        if (confirmMessage && !window.confirm(confirmMessage)) {
            return { success: false, cancelled: true };
        }

        setIsDeleting(true);
        setError(null);

        try {
             const apiMethod = adminApi[`delete${type.charAt(0).toUpperCase() + type.slice(1)}`];

            if (!apiMethod || typeof apiMethod !== 'function') {
                throw new Error(`Метод для удаления ${type} не найден`);
            }

            await apiMethod(id);
            return { success: true };
        } catch (err) {
            const errorMessage = err.message || `Ошибка при удалении ${type}`;
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteItem,
        isDeleting,
        error,
        deleteNews: (id) => deleteItem('News', id),
        deleteDocument: (id) => deleteItem('Document', id),
        deleteLegal: (id) => deleteItem('Legal', id),
        deleteContent: (id) => deleteItem('Content', id)
    };
};
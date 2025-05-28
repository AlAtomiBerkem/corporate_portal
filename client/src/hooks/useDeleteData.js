import { useState } from "react";

export const useDeleteData = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (apiMethod, id, confirmMessage = 'Удалить этот элемент?') => {
        if (confirmMessage && !window.confirm(confirmMessage)) {
            return { success: false, cancelled: true };
        }

        setIsDeleting(true);
        setError(null);

        try {
            if (!apiMethod || typeof apiMethod !== 'function') {
                throw new Error('Метод для удаления не найден');
            }

            await apiMethod(id);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Ошибка при удалении';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteItem,
        isDeleting,
        error
    };
};
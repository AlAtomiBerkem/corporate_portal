import Card from '../pages/AdminPage/Shared/Card.jsx';
import '../pages/AdminPage/Shared/Card.css'
import ScrollPageToTop from "../helpers/ScrollPageToTop.js";
import { useFetchData } from "./useFetchData.js";
import { useDeleteData } from "./useDeleteData.js";
import { useState, useEffect } from "react";
import ContentBtn from "../components/AdmiinNewContentBtn/ContentBtn.jsx";
import '../pages/AdminPage/styles/NewsSection.css';

const useContentSection = ({
                               apiMethods,
                               formComponent: FormComponent,
                               cardContentRender,
                               emptyStateText = "Нет данных",
                               addButtonText = "+ Добавить",
                               pageTitle = "Контент"
                           }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { data: items, refetch } = useFetchData(apiMethods.get);
    const { error, deleteItem, isDeleting } = useDeleteData();

    const handleSuccess = () => {
        setShowForm(false);
        setEditingItem(null);
        refetch();
    };

    const handleDelete = async (id) => {
        try {
            const { success } = await deleteItem(apiMethods.delete, id);
            if (success) refetch();
        } catch (error) {
            console.error(`Ошибка при удалении: `, error);
        }
    };

    useEffect(() => {
        ScrollPageToTop('myBtn');
    }, []);

    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    return (
        <div className="content-section">
            <h2 className="content-title">{pageTitle}</h2>

            <ContentBtn
                name={showForm ? '× Отмена' : addButtonText}
                onClick={() => {
                    setEditingItem(null);
                    setShowForm(!showForm);
                }}
            />

            {showForm && (
                <FormComponent
                    initialData={editingItem}
                    onSuccess={handleSuccess}
                    onCancel={() => setShowForm(false)}
                    apiMethods={{
                        create: apiMethods.create,
                        update: apiMethods.update
                    }}
                />
            )}

            <div className="content-list">
                {items.length === 0 ? (
                    <p className="empty-state">{emptyStateText}</p>
                ) : (
                    items.map(item => (
                        <Card key={item._id}>
                            {cardContentRender(item)}
                            <div className="content-footer">
                                <span className="content-date">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                <div className="content-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            setEditingItem(item);
                                            setShowForm(true);
                                            ScrollPageToTop();
                                        }}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(item._id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Удаление...' : 'Удалить'}
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default useContentSection;
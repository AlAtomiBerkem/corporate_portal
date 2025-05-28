import { useState, useEffect } from 'react';
import { useFetchData } from "../../../hooks/useFetchData.js";
import { useDeleteData } from "../../../hooks/useDeleteData.js";
import { publicApi } from "../../../api/publicApi.js";
import NewsForm from '../createContentComp/NewsForm.jsx';
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import Card from '../Shared/Card.jsx';
import ScrollPageToTop from "../../../helpers/ScrollPageToTop.js";
import '../styles/ArticleSection.css';
import '../Shared/Card.css'

const ContentSection = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const { data: content, loading: isLoading, refetch } = useFetchData(publicApi.getContent);
    const { deleteContent, isDeleting, deleteError } = useDeleteData();

    const handleSuccess = () => {
        setShowForm(false);
        setEditingContent(null);
        refetch();
    };

    const handleDelete = async (id) => {
        const { success } = await deleteContent(id);
        if (success) refetch();
    };

    useEffect(() => {
        ScrollPageToTop('myBtn');
    }, []);

    useEffect(() => {
        if (deleteError) {
            alert(deleteError);
        }
    }, [deleteError]);

    if (isLoading) {
        return <div className="loading-spinner">Загрузка статей...</div>;
    }

    return (
        <div className="article-section">
            <ContentBtn
                name={showForm ? '× Отмена' : '+ Добавить контент'}
                onClick={() => {
                    setEditingContent(null);
                    setShowForm(!showForm);
                }}
            />

            {showForm && (
                <NewsForm
                    initialData={editingContent}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingContent(null);
                    }}
                />
            )}

            <div className="article-list">
                {content.length === 0 ? (
                    <p className="empty-state">Контента пока нет</p>
                ) : (
                    content.map(item => (
                        <Card key={item._id}>
                            <div className="article-item">
                                <div className="article-header">
                                    <h3>{item.title}</h3>
                                </div>
                                <p className="article-excerpt">{item.content}</p>
                                <div className="article-footer">
                                    <div className="article-meta">
                                        <span className="article-date">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="article-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => {
                                                setEditingContent(item);
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
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentSection;

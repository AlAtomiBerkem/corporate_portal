import { useState, useEffect } from 'react';
import { useFetchData } from "../../../hooks/useFetchData.js";
import { useDeleteData } from "../../../hooks/useDeleteData.js";
import { publicApi } from "../../../api/publicApi.js";
import NewsForm from '../createContentComp/NewsForm.jsx';
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import Card from '../Shared/Card.jsx';
import ScrollPageToTop from "../../../helpers/ScrollPageToTop.js";
import '../styles/NewsSection.css';

const NewsSection = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const { data: news, loading: isLoading, refetch } = useFetchData(publicApi.getNews);
    const { error: deleteError, deleteNews, isDeleting } = useDeleteData();

    const handleSuccess = () => {
        setShowForm(false);
        setEditingNews(null);
        refetch();
    };

    const handleDelete = async (newsId) => {
        const { success } = await deleteNews(newsId);
        if (success) {
            refetch();
        }
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
        return <div className="loading-spinner">Загрузка...</div>;
    }

    return (
        <div className="news-section">
            <ContentBtn
                name={showForm ? '× Отмена' : '+ Добавить новость'}
                onClick={() => {
                    setEditingNews(null);
                    setShowForm(!showForm);
                }}
            />

            {showForm && (
                <NewsForm
                    initialData={editingNews}
                    onSuccess={handleSuccess}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingNews(null);
                    }}
                />
            )}

            <div className="news-list">
                {news.length === 0 ? (
                    <p className="empty-state">Новостей пока нет</p>
                ) : (
                    news.map(item => (
                        <Card key={item._id}>
                            <h3 className="news-title">{item.title}</h3>
                            <div
                                className="news-content"
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                            <div className="news-footer">
                                <span className="news-date">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                                <div className="news-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            setEditingNews(item);
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

export default NewsSection;
import '../styles/NewsSection.css';
import Card from '../Shared/Card.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { useFetchData } from "../../../hooks/useFetchData.js";
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import { useState, useEffect } from 'react';
import NewsForm from '../createContentComp/NewsForm.jsx';
import ScrollPageToTop from "../../../helpers/ScrollPageToTop.js";
import { UseDeleteData } from "../../../hooks/useDeleteData.js";

const NewsSection = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const { data: news, refetch } = useFetchData(publicApi.getNews);

    const { error, deleteNews, isDeleting } = UseDeleteData();

    const handleSuccess = () => {
        setShowForm(false);
        setEditingNews(null);
        refetch();
    };

    const handleEdit = (newsItem) => {
        setEditingNews(newsItem);
        setShowForm(true);
    };

    const handleDelete = (newsId) => {
        deleteNews(newsId);
        console.log('залезли чюда 4')

    }

    useEffect(() => {
        ScrollPageToTop('myBtn')
    }, []);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

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
                {news.map(item => (
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
                                        handleEdit(item);
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
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
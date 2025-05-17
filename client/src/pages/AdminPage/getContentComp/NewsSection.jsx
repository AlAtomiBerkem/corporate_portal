import '../styles/NewsSection.css';
import Card from '../Shared/Card.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { useFetchData } from "../../../hooks/useFetchData.js";
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import { useState } from 'react';
import NewsForm from '../createContentComp/NewsForm.jsx';

const NewsSection = () => {
    const [showForm, setShowForm] = useState(false);
    const { data: news, refetch } = useFetchData(publicApi.getNews);

    // После успешного сохранения:
    const handleSuccess = () => {
        setShowForm(false);
        refetch(); // Обновляем список новостей
    };

    return (
        <div className="news-section">
            <ContentBtn
                name={showForm ? '× Отмена' : '+ Добавить новость'}
                onClick={() => setShowForm(!showForm)}
            />

            {showForm && (
                <NewsForm
                    onSuccess={handleSuccess}
                    onCancel={() => setShowForm(false)}
                />
            )}
            <div className="news-list">
                {news.map(item => (
                    <Card key={item._id}>
                        <h3 className="news-title">{item.title}</h3>
                        <p className="news-content">{item.content}</p>
                        <div className="news-footer">
                            <span className="news-date">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                            <div className="news-actions">
                                <button className="btn-edit">Редактировать</button>
                                <button className="btn-delete">Удалить</button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
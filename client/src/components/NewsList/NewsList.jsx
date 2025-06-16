import React, { useState, useEffect } from 'react';
import { publicApi } from '../../api/publicApi.js';
import { Link } from 'react-router-dom';
import './NewsList.css';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await publicApi.getNews();
                // Проверяем наличие data в ответе и что это массив
                const newsData = response?.data || [];
                setNews(Array.isArray(newsData) ? newsData : []);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Не удалось загрузить новости');
                setLoading(false);
                console.error('Ошибка при загрузке новостей:', err);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="news-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка новостей...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="news-error">
                <p>{error}</p>
                <button
                    className="retry-button"
                    onClick={() => window.location.reload()}
                >
                    Попробовать снова
                </button>
            </div>
        );
    }

    if (!Array.isArray(news) || news.length === 0) {
        return (
            <div className="news-empty">
                <p>Новостей пока нет</p>
            </div>
        );
    }

    // Функция для создания краткого описания из HTML-контента
    const createExcerpt = (htmlContent, length = 150) => {
        if (!htmlContent) return 'Описание отсутствует';
        const plainText = htmlContent.replace(/<[^>]+>/g, '');
        return plainText.substring(0, length) + (plainText.length > length ? '...' : '');
    };

    return (
        <div className="news-container">
            <h2 className="news-title">Новости компании</h2>
            <div className="news-grid">
                {news.map((item) => (
                    <article key={item._id} className="news-card">
                        <div className="news-content">
                            <div className="news-meta">
                                <time className="news-date" dateTime={item.createdAt}>
                                    {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                            <h3 className="news-item-title">{item.title || 'Без названия'}</h3>
                            <p className="news-excerpt">
                                {createExcerpt(item.content)}
                            </p>
                            <div className="news-footer">
                                <Link to={`/news/${item._id}`} className="news-read-more">
                                    Читать далее
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
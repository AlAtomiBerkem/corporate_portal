import React, { useState, useEffect } from 'react';
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import AppFooter from "../../components/AppFooter/AppFooter.jsx";
import { publicApi } from '../../api/publicApi.js';
import './PageContentStyle.css';

const PageContent = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedArticleId, setExpandedArticleId] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await publicApi.getContent();
                const articlesData = response?.data || [];
                setArticles(Array.isArray(articlesData) ? articlesData : []);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Не удалось загрузить статьи');
                setLoading(false);
                console.error('Ошибка при загрузке статей:', err);
            }
        };

        fetchArticles();
    }, []);

    const toggleArticle = (id) => {
        setExpandedArticleId(expandedArticleId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Загрузка статей...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <div className="page-content">
            <AppHeader />
            <AppNavbar />

            <div className="articles-container">
                <div className="articles-header">
                    <h1>Полезные статьи и материалы</h1>
                    <p>Актуальная информация о подключении и использовании газа</p>
                </div>

                <div className="articles-list">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className={`article-card ${expandedArticleId === article._id ? 'expanded' : ''}`}
                        >
                            <div
                                className="article-header"
                                onClick={() => toggleArticle(article._id)}
                            >
                                <h2>{article.title}</h2>
                                <span className="toggle-icon">
                                    {expandedArticleId === article._id ? '−' : '+'}
                                </span>
                            </div>

                            {expandedArticleId === article._id && (
                                <div className="article-content">
                                    {article.imageUrl && (
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="article-image"
                                        />
                                    )}
                                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                    <div className="article-meta">
                                        <span className="article-date">
                                            {new Date(article.createdAt).toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        {article.category && (
                                            <span className="article-category">{article.category}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AppFooter />
        </div>
    );
};

export default PageContent;
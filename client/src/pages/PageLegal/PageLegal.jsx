import React, { useState, useEffect } from 'react';
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import AppFooter from "../../components/AppFooter/AppFooter.jsx";
import { publicApi } from '../../api/publicApi.js';
import './PageLegal.css';

const PageLegal = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await publicApi.getLegalArticle();
                const LegalArticleData = response?.data || [];
                setArticles(Array.isArray(LegalArticleData) ? LegalArticleData : []);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Не удалось загрузить статьи');
                setLoading(false);
                console.error('Ошибка при загрузке статей:', err);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="legal-loading">
                <div className="legal-spinner"></div>
                <p>Загрузка юридических статей...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="legal-error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <div className="legal-page">
            <AppHeader />
            <AppNavbar />

            <div className="legal-container">
                <div className="legal-header">
                    <h1>Юридические статьи и документы</h1>
                    <p>Официальная информация и нормативные акты</p>
                </div>

                <div className="legal-articles">
                    {articles.map((article) => (
                        <article key={article._id} className="legal-article">
                            <h2>{article.title}</h2>

                            {article.imageUrl && (
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="legal-article-image"
                                />
                            )}

                            <div
                                className="legal-article-content"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            <div className="legal-article-meta">
                                <time dateTime={article.createdAt}>
                                    {new Date(article.createdAt).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </time>
                                {article.documentNumber && (
                                    <span className="legal-document-number">
                                        № {article.documentNumber}
                                    </span>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <AppFooter />
        </div>
    );
};

export default PageLegal;
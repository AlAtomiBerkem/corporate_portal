import './styles/ArticleSection.css';
import Card from './Shared/Card';

const ArticleSection = () => {
    return (
        <div className="article-section">
            <div className="article-controls">
                <button className="btn-add-article">+ Новая статья</button>
                <div className="article-filter">
                </div>
            </div>

            <div className="article-list">
                <Card>
                    <div className="article-item">
                        <div className="article-header">
                            <h3>Как оптимизировать бизнес-процессы</h3>
                            <span className="article-status published">Опубликовано</span>
                        </div>
                        <p className="article-excerpt">
                            Полное руководство по оптимизации workflow в современных компаниях...
                        </p>
                        <div className="article-footer">
                            <div className="article-meta">
                                <span className="article-category">Бизнес</span>
                                <span className="article-date">12.04.2023</span>
                                <span className="article-views">1,245 просмотров</span>
                            </div>
                            <div className="article-actions">
                                <button className="btn-edit">Редактировать</button>
                                <button className="btn-delete">Удалить</button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="article-item">
                        <div className="article-header">
                            <h3>Новые налоговые правила 2023</h3>
                            <span className="article-status draft">Черновик</span>
                        </div>
                        <p className="article-excerpt">
                            Все изменения в налоговом законодательстве, которые важно учесть...
                        </p>
                        <div className="article-footer">
                            <div className="article-meta">
                                <span className="article-category">Финансы</span>
                                <span className="article-date">28.03.2023</span>
                            </div>
                            <div className="article-actions">
                                <button className="btn-edit">Редактировать</button>
                                <button className="btn-publish">Опубликовать</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ArticleSection;
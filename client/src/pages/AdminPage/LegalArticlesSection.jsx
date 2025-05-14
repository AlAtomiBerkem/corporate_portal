import './styles/LegalArticlesSection.css';
import Card from './Shared/Card';
import ContentBtn from '../../components/AdmiinNewContentBtn/ContentBtn.jsx';
import { publicApi } from "../../api/publicApi.js";
import { useFetchData } from "../../hooks/useFetchData";

const LegalArticlesSection = () => {
    const { data: legalArticles, loading } = useFetchData(publicApi.getLegalArticle);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="technical-section">
            <ContentBtn name={'+ Добавить контент'} />


            <div className="technical-list">
                {legalArticles.map((item, index) => (
                    <Card key={item.id || index}>
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
                                    <button className="btn-edit">Редактировать</button>
                                    <button className="btn-delete">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LegalArticlesSection;

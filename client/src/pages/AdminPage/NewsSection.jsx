import './styles/NewsSection.css';
import Card from './Shared/Card';

const NewsSection = () => {
    return (
        <div className="news-section">
            <div className="news-list">
                <Card>
                    <h3 className="news-title">Заголовок новости</h3>
                    <p className="news-content">Краткое содержание новости...</p>
                    <div className="news-footer">
                        <span className="news-date">01.01.2023</span>
                        <div className="news-actions">
                            <button className="btn-edit">Редактировать</button>
                            <button className="btn-delete">Удалить</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default NewsSection;
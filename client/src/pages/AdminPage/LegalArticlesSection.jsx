import './styles/LegalArticlesSection.css';
import Card from './Shared/Card';

const LegalArticlesSection = () => {

    return (
        <div className="technical-section">
            <div className="technical-list">
                <Card>
                    <div className="technical-item">
                        <h3>Правила для юр.лиц</h3>
                        <p className="technical-description">
                            Требования и условия сотрудничества с юридическими лицами...
                        </p>
                        <div className="technical-footer">
                            <span className="technical-date">Последнее обновление: 15.05.2023</span>
                            <div className="technical-actions">
                                <button className="btn-edit">Изменить</button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="technical-item">
                        <h3>Шаблон договора</h3>
                        <p className="technical-description">
                            Стандартная форма договора для корпоративных клиентов...
                        </p>
                        <div className="technical-footer">
                            <span className="technical-date">Версия 2.1 от 01.04.2023</span>
                            <div className="technical-actions">
                                <button className="btn-download">Скачать DOCX</button>
                                <button className="btn-edit">Редактировать</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LegalArticlesSection;
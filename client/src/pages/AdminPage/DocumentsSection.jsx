const DocumentsSection = () => {
    return (
        <div className="documents-section">
            <div className="documents-list">
                <div className="document-card">
                    <div className="document-info">
                        <h3>Пример документа</h3>
                        <p className="document-meta">
                            <span>Описание документа</span>
                            <span>01.01.2023</span>
                            <span>100 KB</span>
                            <span>Скачиваний: 5</span>
                        </p>
                    </div>
                    <div className="document-actions">
                        <button className="download-btn">Скачать</button>
                        <button className="delete-btn">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsSection;
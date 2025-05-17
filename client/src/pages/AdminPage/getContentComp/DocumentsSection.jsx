import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import Card from '../Shared/Card.jsx';
import { publicApi } from "../../../api/publicApi.js";
import { useEffect, useState } from "react";

const DocumentsSection = () => {
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const response = await publicApi.getDocuments();
                if (response && Array.isArray(response.documents)) {
                    setDocuments(response.documents);
                } else {
                    console.error('Ошибка: данные не являются массивом');
                }
            } catch (error) {
                console.error('Произошла ошибка при загрузке документов:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    if (loading) return <div>...идет загрузка документов</div>;

    return (
        <div className="documents-section">
            <ContentBtn name={'+ Добавить документ'} />
            <div className="documents-list">
                {Array.isArray(documents) && documents.map((item, index) => (
                    <Card key={item.id || index}>
                        <div className="document-info">
                            <h3>{item.title}</h3>
                            <p className="document-meta">
                                <span>{item.originalName}</span>
                                <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                            </p>
                        </div>
                        <div className="document-actions">
                            <button className="download-btn">Скачать</button>
                            <button className="delete-btn">Удалить</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DocumentsSection;

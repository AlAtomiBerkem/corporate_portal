import './DocumentsStyle.css';
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppNavbar from "../AppNavbar/AppNavbar.jsx";
import AppFooter from "../AppFooter/AppFooter.jsx";

const Documents = () => {

    return (
        <div className="documents-page">
            <AppHeader />
            <AppNavbar />
            <main className="documents-container">
                <div className="documents-header">
                    <h1>Документы</h1>
                    <p>Официальные документы и материалы для скачивания</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-message">
                        <p>Загрузка документов...</p>
                    </div>
                ) : documents.length === 0 ? (
                    <div className="no-documents">
                        <p>Документы не найдены</p>
                    </div>
                ) : (
                    <div className="documents-list">
                        {documents.map(doc => (
                            <div key={doc._id} className="document-card">
                                <div className="document-info">
                                    <h3>{doc.name}</h3>
                                    <div className="document-meta">
                                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                                        <span>{Math.round(doc.size / 1024)} KB</span>
                                    </div>
                                </div>
                                <button
                                    className="download-btn"
                                >
                                    Скачать
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <AppFooter />
        </div>
    );
};

export default Documents;
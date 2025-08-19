import { useEffect, useState, useRef } from "react";
import ContentBtn from "../../../components/AdmiinNewContentBtn/ContentBtn.jsx";
import { publicApi } from "../../../api/publicApi.js";
import { adminApi } from "../../../api/adminApi.js";
import Modal from './Modal.jsx';
import '../styles/DocumentSection.css';

const DocumentsSection = () => {
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const docs = await publicApi.getDocuments();
            setDocuments(docs);
        } catch (error) {
            console.error('Ошибка загрузки документов:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
            setIsModalOpen(true);
        }
    };

    const handleSubmit = async () => {
        if (!file || !title.trim()) {
            setUploadError('Пожалуйста, заполните все поля');
            return;
        }

        try {
            setLoading(true);
            setUploadError(null);

            const response = await adminApi.uploadDocument(file, title.trim());

            if (!response?.success) {
                throw new Error(response?.message || 'Ошибка загрузки документа');
            }

            await fetchDocuments();
            setIsModalOpen(false);
            setFile(null);
            setTitle('');
            if (fileInputRef.current) fileInputRef.current.value = '';

        } catch (error) {
            console.error('Ошибка загрузки:', error);
            setUploadError(error.message || 'Произошла ошибка при загрузке');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (fileId, originalName) => {
        try {
            setLoading(true);
            const downloadUrl = `/public/dock/${encodeURIComponent(fileId)}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', originalName);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
        } catch (error) {
            console.error('Ошибка скачивания:', error);
            alert('Не удалось скачать документ: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDocument = async (id) => {
        if (!confirm('Вы уверены, что хотите удалить этот документ?')) return;
        try {
            setLoading(true);
            const response = await adminApi.deleteDocument(id);
            if (response?.success) {
                await fetchDocuments();
            } else {
                throw new Error(response?.message || 'Ошибка удаления документа');
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert(`Ошибка: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="documents-section">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />

            <div className="documents-header">
                <h2>Документы</h2>
                <ContentBtn
                    name={'+ Добавить документ'}
                    onClick={() => fileInputRef.current.click()}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setUploadError(null);
                }}
                title="Добавить документ"
            >
                <div className="upload-modal-content">
                    {file && (
                        <div className="file-info">
                            <p><strong>Файл:</strong> {file.name}</p>
                            <p><strong>Размер:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="document-title">Название документа:</label>
                        <input
                            id="document-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название"
                            className="form-control"
                        />
                    </div>

                    {uploadError && <div className="error-message">{uploadError}</div>}

                    <div className="modal-actions">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-outline"
                            disabled={loading}
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Загрузка...' : 'Загрузить'}
                        </button>
                    </div>
                </div>
            </Modal>

            {loading && !isModalOpen ? (
                <div className="loading-indicator">Загрузка списка документов...</div>
            ) : documents.length > 0 ? (
                <div className="documents-table-container">
                    <table className="documents-table">
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th>Имя файла</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {documents.map(item => (
                            <tr key={item.id} className="document-row">
                                <td className="document-title">{item.title}</td>
                                <td className="document-original-name">{item.originalName}</td>
                                <td className="document-date">{formatDate(item.uploadedAt)}</td>
                                <td className="document-actions">
                                    <button
                                        className="btn btn-download"
                                        onClick={() => handleDownload(item.id, item.originalName)}
                                        disabled={loading}
                                    >
                                        Скачать
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDeleteDocument(item.id)}
                                        disabled={loading}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <p>Нет доступных документов</p>
                </div>
            )}
        </div>
    );
};

export default DocumentsSection;
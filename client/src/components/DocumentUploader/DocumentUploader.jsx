import React, { useState } from 'react';
import './DocumentUploaderStyle.css';

export default function DocumentUploader({ onUpload, onCancel }) {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Пожалуйста, выберите файл');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (name) formData.append('name', name);

            await onUpload(formData);
        } catch (err) {
            setError('Ошибка при загрузке файла');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="document-uploader">
            <h3>Добавить новый документ</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название документа (необязательно):</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите название"
                    />
                </div>
                <div className="form-group">
                    <label>Файл документа:</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <small>Допустимые форматы: PDF, DOC, DOCX (макс. 10MB)</small>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onCancel} disabled={isLoading}>
                        Отмена
                    </button>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Загрузить'}
                    </button>
                </div>
            </form>
        </div>
    );
}
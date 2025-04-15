import { useState } from 'react';
import './NewsEditor.css'

export default function NewsEditor({ onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: 'Администратор' // Добавляем автора по умолчанию
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setError(null);
        setIsLoading(true);

        try {
            // Проверяем токен перед отправкой
            const token = localStorage.getItem('admin_token');
            if (!token) throw new Error('Требуется авторизация');

            const res = await fetch('http://localhost:5000/api/admin/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Ошибка сервера');
            }

            const newItem = await res.json();
            onAdd(newItem);
            setFormData({ title: '', content: '', author: 'Администратор' });
        } catch (err) {
            setError(err.message);
            console.error('Ошибка при добавлении новости:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="news-editor">
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    placeholder="Заголовок новости"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    disabled={isLoading}
                />

                <textarea
                    placeholder="Текст новости"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    disabled={isLoading}
                    rows={5}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Добавление...' : 'Добавить новость'}
                </button>
            </form>
        </div>
    );
}
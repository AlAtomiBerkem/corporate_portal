import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import DOMPurify from 'dompurify';
import { adminApi } from '../../../api/adminApi.js';
import './NewsForm.css';

const NewsForm = ({ onSuccess, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: initialData?.title || '',
        content: initialData?.content || '',
        fontFamily: 'Arial',
        fontSize: '16px'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontFamily.configure({ types: ['textStyle'] }),
            FontSize,
        ],
        content: formData.content,
        onUpdate: ({ editor }) => {
            setFormData(prev => ({
                ...prev,
                content: editor.getHTML()
            }));
        },
    });

    useEffect(() => {
        if (editor && initialData?.content) {
            editor.commands.setContent(initialData.content);
        }
    }, [editor, initialData]);

    useEffect(() => {
        if (editor) {
            editor.chain().focus()
                .setFontFamily(formData.fontFamily)
                .setFontSize(formData.fontSize)
                .run();
        }
    }, [formData.fontFamily, formData.fontSize, editor]);

    const sanitizeContent = (html) => {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'br', 'span'],
            ALLOWED_ATTR: ['style'],
            ALLOW_STYLE: true
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const sanitizedContent = sanitizeContent(formData.content);

            const newsData = {
                title: formData.title.trim(),
                content: sanitizedContent
            };

            if (initialData?._id) {
                await adminApi.updateNews(initialData._id, newsData);
            } else {
                await adminApi.createNews(newsData);
            }

            onSuccess();
        } catch (err) {
            setError(err.message || 'Ошибка при сохранении новости');
            console.error('Ошибка:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const FONT_OPTIONS = [
        { value: 'Arial', label: 'Arial' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'Courier New', label: 'Courier New' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Verdana', label: 'Verdana' }
    ];

    const FONT_SIZE_OPTIONS = [
        { value: '8px', label: '8px' },
        { value: '10px', label: '10px' },
        { value: '12px', label: '12px' },
        { value: '14px', label: '14px' },
        { value: '16px', label: '16px' },
        { value: '18px', label: '18px' },
        { value: '20px', label: '20px' },
        { value: '24px', label: '24px' },
        { value: '26px', label: '26px' },
        { value: '28px', label: '28px' },

    ];

    return (
        <form onSubmit={handleSubmit} className="news-form">
            <h3 className="news-form__title">
                {initialData ? 'Редактировать новость' : 'Добавить новость'}
            </h3>

            {error && <div className="news-form__error">{error}</div>}

            <input
                type="text"
                className="news-form__input"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                }))}
                placeholder="Заголовок новости"
                required
            />

            <div className="editor-container">
                <div className="toolbar">
                    <select
                        value={formData.fontFamily}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            fontFamily: e.target.value
                        }))}
                        className="toolbar-select"
                    >
                        {FONT_OPTIONS.map(font => (
                            <option key={font.value} value={font.value}>
                                {font.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={formData.fontSize}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            fontSize: e.target.value
                        }))}
                        className="toolbar-select"
                    >
                        {FONT_SIZE_OPTIONS.map(size => (
                            <option key={size.value} value={size.value}>
                                {size.label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'active' : ''}
                    >
                        <strong>B</strong>
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor?.isActive('italic') ? 'active' : ''}
                    >
                        <em>I</em>
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor?.isActive('underline') ? 'active' : ''}
                    >
                        <u>U</u>
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor?.isActive('bulletList') ? 'active' : ''}
                    >
                        • Список
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor?.isActive('orderedList') ? 'active' : ''}
                    >
                        1. Список
                    </button>
                </div>

                <EditorContent
                    editor={editor}
                    className="editor-content"
                />
            </div>

            <div className="news-form__actions">
                <button
                    type="button"
                    className="news-form__button news-form__button--cancel"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="news-form__button news-form__button--submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Сохранение...' : initialData ? 'Обновить' : 'Сохранить'}
                </button>
            </div>
        </form>
    );
};

export default NewsForm;
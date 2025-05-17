import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import HardBreak from '@tiptap/extension-hard-break';
import './NewsForm.css';

const NewsForm = ({ onSuccess, onCancel, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        content: '',
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
            HardBreak.configure({
                HTMLAttributes: {
                    class: 'hard-break',
                },
            }),
        ],
        content: formData.content,
        onUpdate: ({ editor }) => {
            setFormData({
                ...formData,
                content: editor.getHTML()
            });
        },
        editorProps: {
            attributes: {
                class: 'editor-content',
                style: `font-family: ${formData.fontFamily}; font-size: ${formData.fontSize}`,
            },
            handleKeyDown: (view, event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    view.dispatch(
                        view.state.tr
                            .replaceSelectionWith(
                                view.state.schema.nodes.hard_break.create()
                            )
                            .scrollIntoView()
                    );
                    return true;
                }
                return false;
            },
        },
    });

    useEffect(() => {
        if (editor) {
            editor.chain().focus()
                .setFontFamily(formData.fontFamily)
                .setFontSize(formData.fontSize)
                .run();
        }
    }, [formData.fontFamily, formData.fontSize, editor]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log('Отправляемые данные:', formData);
            onSuccess();
        } catch (err) {
            setError(err.message || 'Произошла ошибка');
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
        { value: '14px', label: 'Маленький' },
        { value: '16px', label: 'Обычный' },
        { value: '18px', label: 'Большой' },
        { value: '20px', label: 'Очень большой' },
        { value: '24px', label: 'Заголовочный' }
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
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Заголовок новости"
                required
            />

            <div className="editor-container">
                <div className="toolbar">
                    <select
                        value={formData.fontFamily}
                        onChange={(e) => setFormData({...formData, fontFamily: e.target.value})}
                        className="toolbar-select"
                    >
                        {FONT_OPTIONS.map(font => (
                            <option key={font.value} value={font.value}>{font.label}</option>
                        ))}
                    </select>

                    <select
                        value={formData.fontSize}
                        onChange={(e) => setFormData({...formData, fontSize: e.target.value})}
                        className="toolbar-select"
                    >
                        {FONT_SIZE_OPTIONS.map(size => (
                            <option key={size.value} value={size.value}>{size.label}</option>
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
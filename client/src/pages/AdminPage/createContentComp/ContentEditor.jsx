import { useState, useCallback } from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import { stateToHTML } from 'draft-js-export-html';

import 'draft-js/dist/Draft.css';
import './ContentEditor.css';

const ContentEditor = ({
                           onSuccess,
                           onCancel,
                           initialData,
                           apiMethods,
                           contentType = 'content',
                           formTitle = 'Редактирование контента',
                           titlePlaceholder = 'Заголовок'
                       }) => {
    const [formData, setFormData] = useState(initialData || {
        title: initialData?.title || '',
        content: initialData?.content || '',
        fontFamily: 'Arial',
        fontSize: '16px'
    });

    const [editorState, setEditorState] = useState(() => {
        if (initialData?.content) {
            try {
                const contentState = convertFromRaw(JSON.parse(initialData.content));
                return EditorState.createWithContent(contentState);
            } catch (e) {
                console.error('Error parsing content:', e);
            }
        }
        return EditorState.createEmpty();
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    // Обработка изменений редактора
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = newEditorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        setFormData(prev => ({
            ...prev,
            content: JSON.stringify(rawContent)
        }));
    };

    // Применение стилей
    const applyStyle = (style) => {
        handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Применение блочных стилей
    const applyBlockType = (blockType) => {
        handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    // Добавление ссылки
    const confirmLink = useCallback(() => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: linkUrl }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(
                editorState,
                { currentContent: contentStateWithEntity }
            );

            handleEditorChange(
                RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                )
            );
        }
        setShowLinkInput(false);
        setLinkUrl('');
    }, [editorState, linkUrl]);

    const removeLink = useCallback(() => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            handleEditorChange(RichUtils.toggleLink(editorState, selection, null));
        }
    }, [editorState]);

    const insertImage = (url) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            { src: url }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        const newContentState = Modifier.insertText(
            newEditorState.getCurrentContent(),
            newEditorState.getSelection(),
            ' ',
            null,
            entityKey
        );

        handleEditorChange(
            EditorState.push(
                newEditorState,
                newContentState,
                'insert-fragment'
            )
        );
    };

    // Обработчик загрузки файлов
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Здесь должна быть логика загрузки на сервер
        // Для примера используем временную ссылку
        const fileType = file.type.split('/')[0];
        const url = URL.createObjectURL(file);

        if (fileType === 'image') {
            insertImage(url);
        } else {
            // Для других файлов можно добавить ссылку на скачивание
            const selection = editorState.getSelection();
            const contentState = editorState.getCurrentContent();

            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: url }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

            const newContentState = Modifier.replaceText(
                contentState,
                selection,
                file.name,
                null,
                entityKey
            );

            handleEditorChange(
                EditorState.push(
                    editorState,
                    newContentState,
                    'insert-characters'
                )
            );
        }
    };

    // Кастомный рендеринг для изображений и ссылок
    const mediaBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            const contentState = editorState.getCurrentContent();
            const entity = block.getEntityAt(0);
            if (!entity) return null;

            const entityType = contentState.getEntity(entity).getType();
            const data = contentState.getEntity(entity).getData();

            if (entityType === 'IMAGE') {
                return {
                    component: () => <img src={data.src} alt="" style={{ maxWidth: '100%' }} />,
                    editable: false,
                };
            }
        }
        return null;
    };

    // Очистка контента перед сохранением
    const sanitizeContent = (content) => {
        // Здесь можно добавить дополнительную очистку
        return content;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Конвертируем контент редактора в HTML
            const contentState = editorState.getCurrentContent();
            const htmlContent = stateToHTML(contentState);

            // Отправляем на сервер HTML, а не JSON
            const contentData = {
                title: formData.title.trim(),
                content: htmlContent, // Теперь здесь HTML, а не JSON
            };

            if (initialData?._id) {
                await apiMethods.update(initialData._id, contentData);
            } else {
                await apiMethods.create(contentData);
            }

            onSuccess(); // Закрываем редактор или обновляем список
        } catch (err) {
            setError(err.message || `Ошибка при сохранении ${contentType}`);
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

    // Проверка активных стилей для кнопок
    const hasInlineStyle = (style) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    };

    const hasBlockType = (blockType) => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(selection.getStartKey());
        return block.getType() === blockType;
    };

    return (
        <form onSubmit={handleSubmit} className="content-editor">
            <h3 className="content-editor__title">
                {initialData ? `Редактировать ${contentType}` : `Добавить ${contentType}`}
            </h3>

            {error && <div className="content-editor__error">{error}</div>}

            <input
                type="text"
                className="content-editor__input"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                }))}
                placeholder={titlePlaceholder}
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
                        onClick={() => applyStyle('BOLD')}
                        className={hasInlineStyle('BOLD') ? 'active' : ''}
                    >
                        <strong>B</strong>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyStyle('ITALIC')}
                        className={hasInlineStyle('ITALIC') ? 'active' : ''}
                    >
                        <em>I</em>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyStyle('UNDERLINE')}
                        className={hasInlineStyle('UNDERLINE') ? 'active' : ''}
                    >
                        <u>U</u>
                    </button>

                    <button
                        type="button"
                        onClick={() => applyBlockType('unordered-list-item')}
                        className={hasBlockType('unordered-list-item') ? 'active' : ''}
                    >
                        • Список
                    </button>

                    <button
                        type="button"
                        onClick={() => applyBlockType('ordered-list-item')}
                        className={hasBlockType('ordered-list-item') ? 'active' : ''}
                    >
                        1. Список
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowLinkInput(true)}
                        className={showLinkInput ? 'active' : ''}
                    >
                        Ссылка
                    </button>

                    {showLinkInput && (
                        <div className="link-input">
                            <input
                                type="text"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="Введите URL"
                            />
                            <button type="button" onClick={confirmLink}>Применить</button>
                            <button type="button" onClick={() => setShowLinkInput(false)}>Отмена</button>
                        </div>
                    )}

                    <label className="file-upload-button">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            accept="image/*,.pdf,.doc,.docx"
                        />
                        📎 Файл
                    </label>
                </div>

                <div className="editor-content">
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        blockRendererFn={mediaBlockRenderer}
                        placeholder="Начните вводить текст..."
                    />
                </div>
            </div>

            <div className="content-editor__actions">
                <button
                    type="button"
                    className="content-editor__button content-editor__button--cancel"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="content-editor__button content-editor__button--submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Сохранение...' : initialData ? 'Обновить' : 'Сохранить'}
                </button>
            </div>
        </form>
    );
};

export default ContentEditor;
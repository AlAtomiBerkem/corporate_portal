import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export const renderContent = (content, excerptLength = null) => {
    if (!content) {
        return excerptLength ? 'Контент отсутствует' : '';
    }

    try {
        // Проверяем, является ли контент JSON
        const parsed = JSON.parse(content);
        if (parsed && parsed.blocks && parsed.entityMap !== undefined) {
            const contentState = convertFromRaw(parsed);
            const options = {
                entityStyleFn: (entity) => {
                    const entityType = entity.getType();
                    const data = entity.getData();
                    
                    if (entityType === 'LINK') {
                        const { url, isDocument } = data;
                        const linkUrl = url.startsWith('/documents/') 
                            ? `http://localhost:5000/public/dock/${url.split('/').pop()}` 
                            : url;
                        const className = isDocument ? 'draftjs-doc-link' : '';
                        const icon = isDocument ? '<span class="draftjs-doc-link__icon">📄</span>' : '';
                        return {
                            element: 'a',
                            attributes: {
                                href: linkUrl,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                class: className
                            },
                            prefix: icon
                        };
                    }
                    if (entityType === 'IMAGE') {
                        const imageSrc = data.src.startsWith('/images/') 
                            ? `http://localhost:5000/public${data.src}` 
                            : data.src;
                        return {
                            element: 'img',
                            attributes: {
                                src: imageSrc,
                                alt: '',
                                style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;'
                            }
                        };
                    }
                    return {};
                },
                blockStyleFn: (block) => {
                    if (block.getType() === 'atomic') {
                        return { style: { textAlign: 'center' } };
                    }
                    return {};
                }
            };
            
            if (excerptLength) {
                // Для краткого описания возвращаем только текст
                const plainText = contentState.getPlainText();
                return plainText.substring(0, excerptLength) + (plainText.length > excerptLength ? '...' : '');
            }
            
            // Возвращаем HTML строку вместо JSX
            return stateToHTML(contentState, options);
        }
    } catch (e) {
        // Если не JSON, значит это HTML или обычный текст
        console.log('Content is not JSON, treating as HTML:', content.substring(0, 100));
    }
    
    // fallback: если это HTML или обычный текст
    if (excerptLength) {
        const plainText = content.replace(/<[^>]+>/g, '');
        return plainText.substring(0, excerptLength) + (plainText.length > excerptLength ? '...' : '');
    }
    
    // Возвращаем контент как есть (HTML строка)
    return content;
}; 
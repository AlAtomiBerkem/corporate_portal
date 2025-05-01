const res = require("express/lib/response");
const News = require("../model/news");
const Content = require("../model/publicContent");
const Legal = require("../model/legalPageArticle");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const DOCUMENTS_DIR = path.join(__dirname, 'documents');
const META_FILE = path.join(DOCUMENTS_DIR, '_metadata.json');

// Создаём папку для документов, если её нет
if (!fs.existsSync(DOCUMENTS_DIR)) {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Инициализируем файл метаданных, если его нет
if (!fs.existsSync(META_FILE)) {
    fs.writeFileSync(META_FILE, '{}');
}

class AdminController {

    // API для документов

    async addDocument(req, res) {
        try {
            // Проверка наличия файла и названия
            if (!req.files?.document || !req.body?.title) {
                return res.status(400).json({ message: 'Требуется файл и название (title)' });
            }

            const file = req.files.document;
            const fileExt = path.extname(file.name);
            const baseName = path.basename(file.name, fileExt);

            // Генерируем уникальное имя файла
            const uniqueName = `${baseName}_${uuidv4()}${fileExt}`;
            const uploadPath = path.join(DOCUMENTS_DIR, uniqueName);

            // Сохраняем файл
            await file.mv(uploadPath);

            // Читаем и обновляем метаданные
            const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
            meta[uniqueName] = {
                title: req.body.title,
                originalName: file.name,
                uploadedAt: new Date().toISOString()
            };
            fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));

            res.status(201).json({
                message: 'Файл успешно загружен',
                title: req.body.title,
                fileUrl: `/documents/${uniqueName}`,
                originalName: file.name,
                documentId: uniqueName
            });

        } catch (error) {
            console.error('Ошибка загрузки файла:', error);
            res.status(500).json({
                message: 'Ошибка при загрузке файла',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    async deleteDocument(req, res) {
        try {
            const { id } = req.params;

            // Проверка наличия ID (как в addDocument проверяем title)
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Не указан ID документа для удаления'
                });
            }

            // Формируем путь к файлу (как в addDocument)
            const filePath = path.join(DOCUMENTS_DIR, id);

            // Проверка существования файла (аналогично проверке в addDocument)
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: 'Документ не найден'
                });
            }

            // Удаляем файл
            fs.unlinkSync(filePath);

            // Обновляем метаданные (как в addDocument)
            if (fs.existsSync(META_FILE)) {
                const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));

                // Удаляем запись о файле из метаданных
                if (meta[id]) {
                    delete meta[id];
                    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));
                }
            }

            // Возвращаем ответ в том же стиле, что и addDocument
            res.json({
                success: true,
                message: 'Документ успешно удален',
                deletedDocument: {
                    id: id,
                    deletedAt: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('Ошибка при удалении документа:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка при удалении документа',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }



    // API  новостей
    async createNews(req, res) {
        const {title, content} = req.body

        try {
            if(!title || !content) {
               return  res.status(400).send({error: "отсутсует название или описание новости"})
            }
            const NewNews = News({
                title,
                content,
            })
            await NewNews.save();
            res.status(201).json({ message: 'Новость успешно добавлена в бд' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    async upDateNews(req, res) {
        const { id } = req.params;
        try {
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).send({ error: "Отсутствует название или описание новости" });
            }
            const news = await News.findById(id);
            if (!news) {
                return res.status(404).send({ error: "Ошибка: новость не найдена" });
            }
            news.title = title;
            news.content = content;
            news.updatedAt = Date.now();
            await news.save();
            res.json({ message: 'Новость успешно обновлена', news });

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }


    async deleteNews(req, res) {

        try {

            res.json({ message: 'Admin delete news' });
        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

    //API для Юр статей

    async createLegalInformation(req, res) {
        const {title, content} = req.body

        try {
            if(!title || !content) {
                return  res.status(400).send({error: "отсутсует название или описание юр статьи"});
            }
            const NewNews = Legal({
                title,
                content,
            })
            await NewNews.save();
            res.status(201).json({ message: 'юр статья успешно добавлена в бд' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async updateLegalInformation(req, res) {
        try {
            res.json({ message: 'Admin updateLegalInformation' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async deleteLegalInformation(req, res) {
        try {
            res.json({ message: 'Admin deleteLegalInformation' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    //API для контента

    async addTechnicalContent(req, res) {
        try {
            res.json({message: 'Admin addtechnicalContent'});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    async updateTechnicalContent(req, res) {
        try {
            res.json({message: 'Admin updateTechnicalContent'});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    async deleteTechnicalContent(req, res) {
        try {
            res.json({message: 'Admin deleteTechnicalContent'});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}


module.exports = new AdminController()
const News = require("../model/news");
const Content = require("../model/publicContent");
const Legal = require("../model/legalPageArticle");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const DOCUMENTS_DIR = path.join(__dirname, 'documents');
const META_FILE = path.join(DOCUMENTS_DIR, '_metadata.json');

if (!fs.existsSync(DOCUMENTS_DIR)) {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

if (!fs.existsSync(META_FILE)) {
    fs.writeFileSync(META_FILE, '{}');
}

class AdminController {


    async addDocument(req, res) {
        try {
            if (!req.files?.document || !req.body?.title) {
                return res.status(400).json({ message: 'Требуется файл и название (title)' });
            }

            const file = req.files.document;
            const fileExt = path.extname(file.name);
            const baseName = path.basename(file.name, fileExt);

            const uniqueName = `${baseName}_${uuidv4()}${fileExt}`;
            const uploadPath = path.join(DOCUMENTS_DIR, uniqueName);

            await file.mv(uploadPath);

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

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Не указан ID документа для удаления'
                });
            }

            const filePath = path.join(DOCUMENTS_DIR, id);

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: 'Документ не найден'
                });
            }

            fs.unlinkSync(filePath);

            if (fs.existsSync(META_FILE)) {
                const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));

                if (meta[id]) {
                    delete meta[id];
                    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));
                }
            }

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
        const { id } = req.params;

        try {
            const news = await News.findById(id);

            if(!news) {
                res.status(400).json({message: 'ошибка! новость не найдена'})
            }

            await News.findByIdAndDelete(id);

            res.json({
                message: 'Новость успешно удалена',
                deletedNews: {
                    id: news._id,
                    title: news.title,
                    deletedAt: new Date()
                }
            });

        } catch(e) {
            res.status(500).json({ error: e.message });
        }
    }

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
        const {id} = req.params;

        try {
            const {title, content} = req.body
            if (!title || !content) {
                res.status(400).json({message: 'title или content для юо статьи не найдены'})
            }
            const legalContent = await Legal.findById(id);
            if (!legalContent) {
                return res.status(404).send({ error: "Ошибка: юр статья не найдена" });
            }
            legalContent.title = title;
            legalContent.content = content;
            legalContent.updatedAt = Date.now();
            await legalContent.save();
            res.json({ message: 'юр статья успешно обновлена', legalContent });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async deleteLegalInformation(req, res) {
        const { id } = req.params;

        try {
            const legal = await Legal.findById(id);
            if (!legal) {
                return res.status(404).json({ message: 'Юридическая статья не найдена' });
            }

            await Legal.findByIdAndDelete(id);

            return res.json({
                message: 'Юридическая статья успешно удалена',
                deletedLegal: {
                    id: legal._id,
                    title: legal.title,
                    deletedAt: new Date()
                }
            });

        } catch (e) {
            console.error(`Ошибка при удалении юридической статьи ${id}:`, e);
            return res.status(500).json({
                error: 'Произошла ошибка при удалении юридической статьи',
                details: process.env.NODE_ENV === 'development' ? e.message : undefined
            });
        }
    }

    async addTechnicalContent(req, res) {
        const {title, content} = req.body

        try {
            if(!title || !content) {
                return  res.status(400).send({error: "отсутсует название или описание контента"});
            }
            const newContent = Content({
                title,
                content,
            })
            await newContent.save();
            res.status(201).json({ message: 'контент успешно добавлена в бд' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async updateTechnicalContent(req, res) {
        const {id} = req.params;

        try {
            const {title, content} = req.body
            if (!title || !content) {
                res.status(400).json({message: 'title или content для контента не найдены'})
            }
            const contentArticle = await Content.findById(id);
            if (!contentArticle) {
                return res.status(404).send({ error: "Ошибка: контент не найден" });
            }
            contentArticle.title = title;
            contentArticle.content = content;
            contentArticle.updatedAt = Date.now();
            await contentArticle.save();
            res.json({ message: 'content успешно обновлен', contentArticle });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async deleteTechnicalContent(req, res) {
        const { id } = req.params;

        try {
            const content = await Content.findById(id);
            if (!content) {
                return res.status(404).json({ message: 'контент не найден' });
            }

            await Content.findByIdAndDelete(id);

            return res.json({
                message: 'контент успешно удален',
                deletedLegal: {
                    id: content._id,
                    title: content.title,
                    deletedAt: new Date()
                }
            });

        } catch (e) {
            console.error(`Ошибка при удалении контента ${id}:`, e);
            return res.status(500).json({
                error: 'Произошла ошибка при удалении контента',
                details: process.env.NODE_ENV === 'development' ? e.message : undefined
            });
        }
    }
}


module.exports = new AdminController()
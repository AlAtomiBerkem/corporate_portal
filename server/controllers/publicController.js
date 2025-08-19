const News = require("../model/news");
const Document = require("../model/document");
const Legal = require("../model/legalPageArticle");
const Public = require("../model/publicContent");
const path = require("path");
const fs = require('fs'); // Добавляем импорт модуля fs


const DOCUMENTS_DIR = path.join(__dirname, 'documents');
const IMAGES_DIR = path.join(__dirname, 'images');
const META_FILE = path.join(DOCUMENTS_DIR, '_metadata.json');
const IMAGES_META_FILE = path.join(IMAGES_DIR, '_metadata.json');
console.log(DOCUMENTS_DIR)
class PublicController {
    async publicContent(req, res) {
        try {
            const content = await Public.find({});

            if (!content || content.length === 0) {
                return res.status(404).json({ message: "Данные не найдены" });
            }

            res.status(200).json({
                data: content
            });

        } catch (e) {
            console.error("Ошибка при получении данных:", e.message);
            res.status(500).json({
                error: "Внутренняя ошибка сервера",
                details: e.message
            });
        }
    }

    async publicNews(req, res) {
        try {
            const news = await News.find({});
            if(!news || news.length === 0) {
                res.status(400).json({message: 'ошибка новость не найдена'})
            }

            res.status(200).json({
                data: news
            });
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    };

    async publicDock(req, res) {
        try {
            if (!fs.existsSync(DOCUMENTS_DIR)) {
                return res.status(200).json({
                    success: true,
                    documents: [],
                    message: 'Папка с документами пуста'
                });
            }
            let meta = {};
            if (fs.existsSync(META_FILE)) {
                meta = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
            }
            const files = fs.readdirSync(DOCUMENTS_DIR)
                .filter(file => file !== '_metadata.json' && !file.startsWith('.') && fs.existsSync(path.join(DOCUMENTS_DIR, file)));
            const documents = files.map(file => ({
                id: file,
                title: meta[file]?.title || path.basename(file, path.extname(file)),
                url: `/documents/${file}`,
                originalName: meta[file]?.originalName ? Buffer.from(meta[file].originalName, 'utf8').toString() : file,
                size: fs.statSync(path.join(DOCUMENTS_DIR, file)).size,
                uploadedAt: meta[file]?.uploadedAt || new Date().toISOString()
            }));
            res.status(200).json({
                success: true,
                count: documents.length,
                documents
            });
        } catch (error) {
            console.error('Ошибка при получении документов:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка при получении списка документов',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    async downloadDocument(req, res) {
        try {
            const requestedFileName = req.params.fileName;
            const filePath = path.join(DOCUMENTS_DIR, requestedFileName);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: "Физический файл не найден"
                });
            }
            let meta = {};
            if (fs.existsSync(META_FILE)) {
                meta = JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
            }
            const originalName = meta[requestedFileName]?.originalName ? Buffer.from(meta[requestedFileName].originalName, 'utf8').toString() : requestedFileName;
            res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            res.status(500).json({
                success: false,
                message: 'Внутренняя ошибка сервера'
            });
        }
    }

    async getImage(req, res) {
        try {
            const requestedFileName = req.params.fileName;
            const filePath = path.join(IMAGES_DIR, requestedFileName);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: "Изображение не найдено"
                });
            }
            const ext = path.extname(requestedFileName).toLowerCase();
            const mimeTypes = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp'
            };
            const contentType = mimeTypes[ext] || 'image/jpeg';
            res.setHeader('Content-Type', contentType);
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('Ошибка получения изображения:', error);
            res.status(500).json({
                success: false,
                message: 'Внутренняя ошибка сервера'
            });
        }
    }

    async publicLegal(req, res) {
        try {
            const legal = await Legal.find({})
            if(!legal) {
                res.status(400).json({message: 'ошибка юр статьи не найдены или пусты'})
            }
            res.status(200).json({data: legal})
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    }
}

module.exports = new PublicController;
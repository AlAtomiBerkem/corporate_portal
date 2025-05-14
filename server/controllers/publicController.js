const News = require("../model/news");
const Document = require("../model/Document");
const Legal = require("../model/legalPageArticle");
const Public = require("../model/publicContent");
const path = require("path");
const fs = require('fs'); // Добавляем импорт модуля fs


const DOCUMENTS_DIR = path.join(__dirname, '/documents');
const META_FILE = path.join(DOCUMENTS_DIR, '_metadata.json');

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
                .filter(file => file !== '_metadata.json' && !file.startsWith('.'));

            const documents = files.map(file => ({
                id: file,
                title: meta[file]?.title || path.basename(file, path.extname(file)),
                url: `/documents/${file}`,
                originalName: meta[file]?.originalName || file,
                size: meta[file]?.size || 0,
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
        const fileName = req.params.fileName;
        const filePath = path.join(DOCUMENTS_DIR, fileName);

        if (fs.existsSync(filePath)) {
            res.download(filePath, fileName, (err) => {
                if (err) {
                    console.error('Ошибка при загрузке файла:', err);
                    res.status(500).send('Ошибка при загрузке файла');
                }
            });
        } else {
            res.status(404).send('Файл не найден');
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
const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Файл не загружен' });
        }

        const document = new Document({
            name: req.body.name || req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
            uploadedBy: req.userId
        });

        const savedDoc = await document.save();
        res.status(201).json(savedDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const docs = await Document.find().sort({ uploadedAt: -1 }).populate('uploadedBy', 'username');
        res.json(docs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Документ не найден' });
        }

        // Удаляем файл с сервера
        fs.unlinkSync(doc.path);

        // Удаляем запись из БД
        await Document.findByIdAndDelete(req.params.id);

        res.json({ message: 'Документ удален' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.downloadDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);
        if (!doc) {
            return res.status(404).json({ message: 'Документ не найден' });
        }

        if (!fs.existsSync(doc.path)) {
            return res.status(404).json({ message: 'Файл не найден на сервере' });
        }

        res.download(doc.path, doc.name);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
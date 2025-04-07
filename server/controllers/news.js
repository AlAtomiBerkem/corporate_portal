const News = require('../models/News');

exports.getAllNews = async (req, res) => {
    try {
        const posts = await News.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    const post = new News({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newNews = await post.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
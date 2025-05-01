const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: Number,
    mimetype: String,
    createdAt: { type: Date, default: Date.now }
});
documentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.models.Document || mongoose.model('Document', documentSchema);
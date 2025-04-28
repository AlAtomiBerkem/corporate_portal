const mongoose = require('mongoose');

const PublicContentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

PublicContentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


module.exports = mongoose.model('PublicContent', PublicContentSchema)
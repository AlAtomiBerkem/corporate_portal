const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    login: { type: String, unique: true },
    password: String,
    refreshToken: String
});

// хешируем пороль перед отправкой
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 6);
    }
    next();
});

// Метод для проверки пароля
adminSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    login: { type: String, unique: true },
    password:  String,
    refreshToken: String
});

adminSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// // хешируем если регистрируемся через фронт
// adminSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

module.exports = mongoose.model('Admin', adminSchema);
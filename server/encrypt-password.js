const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function encryptAdminPassword() {
    await mongoose.connect('mongodb://127.0.0.1:27017/react-blog');

    const admin = await mongoose.connection.db.collection('admins').findOne();
    if (admin && !admin.password.startsWith('$2a$')) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        await mongoose.connection.db.collection('admins').updateOne(
            { _id: admin._id },
            { $set: { password: hashedPassword } }
        );
        console.log('Пароль зашифрован!');
    }

    mongoose.disconnect();
}

encryptAdminPassword();
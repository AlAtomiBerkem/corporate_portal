// Временный тестовый скрипт
const testAuth = async () => {
    const admin = await Admin.findOne({login: 'admin'});
    console.log('Админ из базы:', admin);

    if (admin) {
        console.log('Тестируем validatePassword...');
        const result = await admin.validatePassword('admin123');
        console.log('Результат:', result);
    }
};

testAuth();
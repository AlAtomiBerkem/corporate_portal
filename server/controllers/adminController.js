
class AdminController {
    async getDashboard(req, res) {
        try {
            // Ваша логика для dashboard
            res.json({ message: 'Admin dashboard data' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async banUser(req, res) {
        try {
            // Ваша логика для бана пользователя
            res.json({ message: 'User banned successfully' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = new AdminController()
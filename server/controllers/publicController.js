class PublicController {
    async publicContent(req, res) {
        try {
            res.json({ message: 'пользователь получил данные для страницы content' });
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    };

    async publicNews(req, res) {
        try {
            res.json({ message: 'Пользователи получили новости' });
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    };

    async publicDock(req, res) {
        try {
            res.json({ message: 'пользовотель получил документы' });
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    }

    async publicLegal(req, res) {
        try {
            res.json({message: 'пользователь получил статьи для '})
        } catch (e) {
            res.status(500).send({error: e.message});
        }

    }
}

module.exports = new PublicController();
const note = require(__base + 'app/lib/note');

const noteController = {
    getAll: (req, res) => {
        try {
            const notes = note.getAll();
            return res.status(200).send(notes);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    },

    insertOne: (req, res) => {
        if (!req.body.body) {
            return res.status(400).send('missing-params');
        }

        try {
            note.insertOne(req.body.body, req.body.color);
            return res.status(200).send('ok');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    },

    findOne: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('missing-params');
        }

        try {
            const findNote = note.findOne(req.params.id);
            return res.status(200).send(findNote);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    },

    removeOne: (req, res) => {
        if (!req.params.id) {
            return res.status(400).send('missing-params');
        }

        try {
            note.removeOne(req.params.id);
            return res.status(200).send('ok');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
};

module.exports = noteController;

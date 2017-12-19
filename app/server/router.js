const express = require('express');
const router = express.Router();
const noteController = require(__base + 'app/server/controllers/noteController');

router.get('/notes', noteController.getAll);
router.get('/note/:id', noteController.findOne);
router.post('/note/', noteController.insertOne);
router.delete('/note/:id', noteController.removeOne);

module.exports = router;

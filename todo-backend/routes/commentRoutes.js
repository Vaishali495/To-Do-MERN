const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController.js');

router.post('/Add',commentController.addComment);
router.get('/Get/:taskId',commentController.getComment);

module.exports = router;
const express = require('express');
const router = express.Router();
const {createFeedback,getAllFeedback} = require('../controllers/feedback.controller');
const authMiddleware = require('../middlewares/verification.middleware');

router.post('/create-feedback/:eventId', authMiddleware, createFeedback);
router.get('/get-all-feedback/:eventId',authMiddleware,getAllFeedback)

module.exports = router;
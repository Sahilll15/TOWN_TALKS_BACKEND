const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback, getFeedbackDataForPiechart } = require('../controllers/feedback.controller');
const authMiddleware = require('../middlewares/verification.middleware');

router.post('/create-feedback/:eventId', authMiddleware, createFeedback);
router.get('/get-all-feedback/:eventId', authMiddleware, getAllFeedback)
router.get('/get-feedback-data-for-piechart', authMiddleware, getFeedbackDataForPiechart)

module.exports = router;
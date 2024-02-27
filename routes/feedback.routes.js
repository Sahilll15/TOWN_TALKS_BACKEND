const express = require('express');
const router = express.Router();
const { createFeedback, getFeedkbackdataByEventId, getAllFeedback, getFeedbackDataForPiechart } = require('../controllers/feedback.controller');
const authMiddleware = require('../middlewares/verification.middleware');

router.post('/create-feedback/:eventId', authMiddleware, createFeedback);
router.get('/get-all-feedback/:eventId', authMiddleware, getAllFeedback)
router.get('/get-feedback-data-for-piechart', authMiddleware, getFeedbackDataForPiechart)
router.get('/get-feedback-data-by-event-id/:eventId', authMiddleware, getFeedkbackdataByEventId)

module.exports = router;
const express = require('express');
const router = express.Router();
const { Payment } = require('../models/payment.models');
const {
    createPoll, getAllPolls, getPollById, answerPolls, getAll, getanswerPollById, answerOptions,
    getAnswerbyPollId, getPollPieChartbyPollId
} = require('../controllers/polls.controller');
const authMiddleware = require('../middlewares/verification.middleware');

router.post('/createPoll', createPoll);

router.get('/getAllPolls', getAllPolls);

router.get('/getPollById/:id', getPollById);

router.post('/answerPolls/:pollId', authMiddleware, answerPolls);

router.get('/getPayment/:userId', async (req, res) => {
    const userId = req.params.userId
    const payments = await Payment.find({ userId: userId })
    res.json(payments)

});

router.get('/getAll', getAll);
// router.get('/getanswerPollById/:id',authMiddleware, getanswerPollById);
router.get('/getanswerByPollId/:pollId', authMiddleware, getAnswerbyPollId);
router.get('/getPollPieChart/:pollId', getPollPieChartbyPollId);







module.exports = router;

const express = require('express');
const router = express.Router();
const {
    createPoll, getAllPolls, getPollById, answerPolls, getAll, getanswerPollById, answerOptions,
    getAnswerbyPollId
} = require('../controllers/polls.controller');
const authMiddleware = require('../middlewares/verification.middleware');

router.post('/createPoll', createPoll);

router.get('/getAllPolls', getAllPolls);

router.get('/getPollById/:id', getPollById);

router.post('/answerPolls/:pollId', authMiddleware, answerPolls);

router.get('/getAll', getAll);
// router.get('/getanswerPollById/:id',authMiddleware, getanswerPollById);
router.get('/getanswerByPollId/:pollId', authMiddleware, getAnswerbyPollId);





module.exports = router;

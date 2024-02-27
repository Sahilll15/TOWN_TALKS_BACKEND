const express = require('express');
const router = express.Router();
const {
    createPoll,getAllPolls,getPollById,answerPolls,getAll,getanswerPollById,answerOptions,
    getAnswerbyPollId
} = require('../controllers/polls.controller');
const authMiddleware = require('../middlewares/verification.middleware');

// Create a new poll
router.post('/createPoll', createPoll);

// Get all polls
router.get('/getAllPolls', getAllPolls);

// Get a poll by ID
router.get('/getPollById/:id', getPollById);

// Submit a vote for a specific option in a poll
// router.post('/submit/:id/vote', submitVote);
router.post('/answerPolls/:pollId',authMiddleware, answerPolls);

router.get('/getAll', getAll);  
// router.get('/getanswerPollById/:id',authMiddleware, getanswerPollById);
router.get('/getanswerByPollId/:pollId',authMiddleware, getAnswerbyPollId);





module.exports = router;

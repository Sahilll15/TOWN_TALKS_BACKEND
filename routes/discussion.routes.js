const express = require('express');

const { createDiscussion, getDiscussionByCommunityId } = require('../controllers/disscusion.controller')
const authMiddleware = require('../middlewares/verification.middleware')

const router = express.Router();

router.post('/create/:id', authMiddleware, createDiscussion)
router.get('/get/:id', authMiddleware, getDiscussionByCommunityId)


module.exports = router;
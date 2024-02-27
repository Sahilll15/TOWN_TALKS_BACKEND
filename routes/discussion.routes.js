const express = require('express');

const { createDiscussion, getDiscussionByCommunityId } = require('../controllers/disscusion.controller')

const router = express.Router();

router.post('/create/:id', createDiscussion)
router.get('/get/:id', getDiscussionByCommunityId)


module.exports = router;
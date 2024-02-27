const express = require('express');
const router = express.Router();
const {createforum,
    getforums,
    getforumById,
    deleteforum,
    getforumByUserId,
    updateforum,
    saveforum,
    getSavedforums,
    getforumsByFollowing} = require('../controllers/forum.controller');
    const authMiddleware = require('../middlewares/verification.middleware')
//import middleware

router.post('/createforum', createforum);
router.get('/getforums', getforums);
router.get('/getforumById/:id',authMiddleware, getforumById);
router.delete('/deleteforum/:id',authMiddleware, deleteforum);
router.get('/getforumByUserId',authMiddleware, getforumByUserId);
router.put('/updateforum/:id',authMiddleware, updateforum);
router.post('/saveforum/:id',authMiddleware, saveforum);
router.get('/getSavedforums',authMiddleware, getSavedforums);
router.get('/getforumsByFollowing',authMiddleware, getforumsByFollowing);

module.exports = router;
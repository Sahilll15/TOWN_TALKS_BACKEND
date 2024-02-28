const express = require('express');
const router = express.Router();
const { register, login, getUserId, getOragniser } = require('../controllers/user.controllers')
const authMiddleware = require('../middlewares/verification.middleware')

router.post('/register', register);
router.post('/login', login);
router.get('/getUser', authMiddleware, getUserId);
router.get('/getOrganiser', authMiddleware, getOragniser);

module.exports = router;
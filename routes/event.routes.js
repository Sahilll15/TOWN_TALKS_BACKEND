const { createEvent, getEvents, joinEvent, leaveEvent, deleteEvent,getEventById} = require('../controllers/event.controller')
const authMiddleware = require('../middlewares/verification.middleware')
const { upload } = require('../middlewares/upload')


const router = require('express').Router()

router.post('/create-event', upload.single('eventImage'), authMiddleware, createEvent)
router.get('/events', authMiddleware, getEvents)
router.post('/join-event/:id', authMiddleware, joinEvent)
router.post('/leave-event/:id', authMiddleware, leaveEvent)
router.delete('/delete-event/:id', authMiddleware, deleteEvent)
router.get('/get-event/:id', authMiddleware, getEventById)


module.exports = router


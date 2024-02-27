const { createEvent, getEvents } = require('../controllers/event.controller')


const router = require('express').Router()

router.post('/create-event', createEvent)
router.get('/events', getEvents)


module.exports = router

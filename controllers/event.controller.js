const { Event } = require('../models/event.models')
const { User } = require('../models/user.models')
const z = require('zod')


const createEvent = async (req, res) => {
    const userId = req.user.id;
    console.log(req.user)
    const { title, description, startDate, endDate, address, city, zip, isPaid, price, image } = req.body


    if (!title || !description || !startDate || !endDate || !address || !city || !zip || !isPaid || !price) return res.status(400).json({ message: 'All fields are required' })


    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' })


    const event = new Event({
        title,
        description,
        startDate,
        endDate,
        address,
        city,
        zip,
        isPaid,
        price,
        numberOfParticipants: 0,
        image,
        userId
    })

    if (req.file) {
        event.image = req.file.path
    }

    try {
        await event.save()
        res.status(201).json(event)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


const joinEvent = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // if (event.numberOfParticipants >= event.maxParticipants) return res.status(400).json({ message: 'Event is full' });

    event.numberOfParticipants += 1;
    event.participants.push(userId);

    await event.save();
    res.status(200).json(event);
}


const leaveEvent = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    event.numberOfParticipants -= 1;
    event.participants.pull(userId);

    await event.save();
    res.status(200).json(event);

}


const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (event.userId.toString() !== userId) return res.status(401).json({ message: 'You are not authorized to delete this event' });

    await event.remove();
    res.status(200).json({ message: 'Event deleted successfully' });


}

module.exports = { createEvent, getEvents, joinEvent, leaveEvent, deleteEvent }
const { Event } = require('../models/event.models')
const { User } = require('../models/user.models')
const { sendVerificationEmail, generateVerificationToken, citizenJoinEventEmail, organizerEventMail }= require('../utils/email')
const z = require('zod')
const { createCommunity } = require('../controllers/community.controllers')
const { Community } = require('../models/community.models')

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

        const eventDetails={
            title:event.title,
            description:event.description,
            startDate:event.startDate,
            endDate:event.endDate,
            address:event.address,
            city:event.city,
            zip:event.zip,
            isPaid:event.isPaid,
            price:event.price,
            numberOfParticipants:event.numberOfParticipants
    
        }
        await organizerEventMail(user.email,eventDetails)
            .then(()=>console.log('Email sent'))
            .catch((err)=> console.log('Error:',err));

        await createCommunity(
            event.title,
            event.description,
            event._id,
            event.userId,
            event.image

        ).then(() => {
            console.log('Community created successfully')
        })
        res.status(200).json({
            message: 'Event created successfully',
            event
        })

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

    const community = await Community.findOne({
        eventId: eventId
    })

    if (!community) return res.status(404).json({ message: 'Community not found' });

    community.participants.push(userId);
    await community.save();
    await event.save();


    const eventDetails={
        title:event.title,
        description:event.description,
        startDate:event.startDate,
        endDate:event.endDate,
        address:event.address,
        city:event.city,
        zip:event.zip,
        isPaid:event.isPaid,
        price:event.price,
        numberOfParticipants:event.numberOfParticipants

    }
    await citizenJoinEventEmail(user.email,eventDetails)
        .then(()=>console.log('Email sent'))
        .catch((err)=> console.log('Error:',err));

    res.status(200).json({
        message: 'Joined event successfully',
        event,
        community
    });

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
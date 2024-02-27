const { Event } = require('../models/event.models')
const z = require('zod')


const createEvent = async (req, res) => {
    const { title, description, startDate, endDate, address, city, zip, isPaid, price, numberOfParticipants, image, userId } = req.body


    const schema = z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        startDate: z.date(),
        endDate: z.date(),
        address: z.string().nonempty(),
        city: z.string().nonempty(),
        zip: z.number(),
        isPaid: z.boolean(),
        price: z.number(),
        numberOfParticipants: z.number(),
        image: z.string().nonempty(),
        userId: z.string().nonempty()
    })



    const correctBody = schema.parse(req.body)

    if (!correctBody) {
        return res.status(400).json({ message: 'Invalid input' })
    }


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
        numberOfParticipants,
        image,
        userId
    })
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


module.exports = { createEvent, getEvents }
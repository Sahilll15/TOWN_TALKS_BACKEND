const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfParticipants: {
        type: Number,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Event = mongoose.model('Event', eventSchema)

module.exports = { Event }


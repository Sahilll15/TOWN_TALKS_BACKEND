const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({

    title: {
        type: String,

    },
    description: {
        type: String,

    },
    eventMode: {
        type: String,

    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },
    address: {
        type: String,

    },
    city: {
        type: String,

    },
    zip: {
        type: Number,

    },
    isPaid: {
        type: Boolean,
    },
    price: {
        type: Number,
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

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    meetinglink: {
        type: String
    },

})


const Event = mongoose.model('Event', eventSchema)

module.exports = { Event }


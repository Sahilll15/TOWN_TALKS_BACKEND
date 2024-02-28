const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({

    paymentId: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        // required: true
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
}
)

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = { Payment }
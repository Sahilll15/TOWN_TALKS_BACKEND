const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    rating: { 
        type: Number,
        required: true
    },
    suggestion:{
        type:String,
        required:true
    }
    })

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports={Feedback};
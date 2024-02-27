const mongoose = require('mongoose');

const answerPollSchema = new mongoose.Schema({
    pollId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Poll'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answer:{
        type:Number,
        required:true
    }
    })

const AnswerPoll = mongoose.model('AnswerPoll', answerPollSchema);
module.exports={AnswerPoll};
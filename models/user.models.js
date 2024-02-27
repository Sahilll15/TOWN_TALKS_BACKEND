const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true


    },
    typeOfUser:{
        type: String,
        enum: ['organizer', 'citizen','government'],
    
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
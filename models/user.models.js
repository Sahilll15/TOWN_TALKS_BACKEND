const mongoose = require('mongoose')

const userSchema = new mongoose.schema({
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


    },
    typeOfUser:{
        type: String,
        enum: ['organizer', 'citizen','government'],
    
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const userSchema = new mongoose.schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
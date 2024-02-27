const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(PORT, () => {
    console.log(`server is running on ,${PORT}`)
})



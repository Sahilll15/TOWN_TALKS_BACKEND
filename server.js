const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./routes/user.routes')
const eventRoutes = require('./routes/event.routes')
const forumRoutes = require('./routes/forum.routes')
const feedbackRoutes = require('./routes/feedback.routes')
const discussionRoutes = require('./routes/discussion.routes')




const app = express()

const PORT = process.env.PORT || 4000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api/event', eventRoutes)
app.use('/api/user', authRouter)
app.use('/api/forum', forumRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/discussion', discussionRoutes)



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



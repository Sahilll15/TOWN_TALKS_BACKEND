const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment } = require('./models/payment.models')


const authRouter = require('./routes/user.routes')
const eventRoutes = require('./routes/event.routes')
const forumRoutes = require('./routes/forum.routes')
const feedbackRoutes = require('./routes/feedback.routes')
const discussionRoutes = require('./routes/discussion.routes')
const pollRouter = require('./routes/poll.routes')




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
app.use('/api/poll', pollRouter)

app.post('/api/create-payment-session', async (req, res) => {
    const { price, userId, eventId } = req.body;

    const payment = await Payment({
        paymentId: Math.random().toString(36).substring(7),
        paymentStatus: 'completed',
        paymentAmount: price,
        paymentDate: new Date(),
        userId: userId,
        eventId: eventId
    });

    await payment.save();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Product Name',
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: userId,
                eventId: eventId
            }
        });

        res.json({ id: session.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/api/webhook', async (req, res) => {
    const event = req.body;
    console.log('in webhook')
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            const payment = new Payment({
                paymentId: session.id,
                paymentStatus: 'completed',
                paymentAmount: session.amount_total / 100,
                paymentDate: new Date(),
                userId: session.metadata.userId,
                eventId: session.metadata.eventId
            });
            await payment.save();
            console.log('saved to bd')
            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});


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



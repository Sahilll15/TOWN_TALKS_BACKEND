const { Feedback } = require('../models/feedback.models')
const { Event } = require('../models/event.models')


// Create and Save a new Feedback
const createFeedback = async (req, res) => {
    // Validate request
    if (!req.body.rating || !req.body.suggestion) {
        return res.status(400).send({
            message: "Feedback content can not be empty"
        });
    }

    const event = await Event.findById(req.params.eventId);

    if (!event) {
        return res.status(404).send({
            message: "Event not found with id " + req.params.eventId
        });
    }

    // Create a Feedback
    const feedback = new Feedback({
        userId: req.user.id,
        eventId: req.params.eventId,
        rating: req.body.rating,
        suggestion: req.body.suggestion
    });

    // Save Feedback in the database
    feedback.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Feedback."
            });
        });
}

//get all feedback
const getAllFeedback = async (req, res) => {
    try {
        const allFeedback = await Feedback.find({ eventId: req.params.eventId })
            .populate('userId')
            .populate('eventId');
        res.json(allFeedback);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving feedback: " + error.message
        });
    }
}

const getFeedkbackdataByEventId = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ eventId: req.params.eventId })
            .populate('userId');
        res.json(feedbacks);

    } catch (error) {
        res.status(500).send({
            message: "Error retrieving feedback: " + error.message
        });
    }
}

const getFeedbackDataForPiechart = async (req, res) => {
    try {
        const events = await Event.find({
            userId: req.user.id
        });

        let ratings = [];
        let totalRating = 0;
        let totalFeedback = 0;

        for (const event of events) {
            const feedback = await Feedback.find({ eventId: event._id });
            const eventRating = feedback.reduce((acc, curr) => acc + curr.rating, 0);
            const eventFeedbackCount = feedback.length;
            const meanEventRating = eventFeedbackCount > 0 ? eventRating / eventFeedbackCount : 0;
            totalRating += eventRating;
            totalFeedback += eventFeedbackCount;
            ratings.push({
                label: event.title,
                value: meanEventRating
            });
        }

        const meanRating = totalFeedback > 0 ? totalRating / totalFeedback : 0;

        res.json({
            ratings,
            meanRating
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving feedback: " + error.message
        });
    }
}

module.exports = { createFeedback, getAllFeedback, getFeedbackDataForPiechart, getFeedkbackdataByEventId };


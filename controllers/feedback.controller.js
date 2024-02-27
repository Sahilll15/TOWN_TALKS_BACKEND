const {Feedback} = require('../models/feedback.models')
const {Event} = require('../models/event.models')


// Create and Save a new Feedback
const createFeedback = async(req, res) => {
    // Validate request
    if (  !req.body.rating || !req.body.suggestion) {
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


module.exports = {createFeedback,getAllFeedback};


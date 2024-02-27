const mongoose = require('mongoose');

const forumSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        index: true
    },
    media: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

}, { timestamps: true });

const Forum = mongoose.model("Product", forumSchema);
module.exports = Forum;
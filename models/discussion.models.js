const mongoose = require('mongoose');
const { Schema } = mongoose;

const discussionSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Discussion content is required'],
        },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        communityId: { type: Schema.Types.ObjectId, ref: 'Community', required: true },

    },
    { timestamps: true }
);

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = { Discussion };



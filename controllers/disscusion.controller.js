const { Discussion } = require('../models/discussion.models')
const { User } = require('../models/user.models')

const createDiscussion = async (req, res) => {
    const userId = req.user.id;
    const communityId = req.params.id;
    const { content } = req.body

    if (!content) return res.status(400).json({ message: 'Content is required' })

    const user = await User.findById(userId)

    if (!user) return res.status(400).json({ message: 'User not found' })
    try {
        const newDiscussion = new Discussion({
            content,
            userId,
            communityId
        });
        await newDiscussion.save()

        res.status(201).json({ message: 'Discussion created successfully', newDiscussion })

    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getDiscussionByCommunityId = async (req, res) => {
    const communityId = req.params.id
    try {
        const discussions = await Discussion.find({ communityId }).populate('userId', 'username')
        res.status(200).json(discussions)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createDiscussion,
    getDiscussionByCommunityId
}
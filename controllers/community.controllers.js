const { Community } = require('../models/community.models');


const createCommunity = async (name, description, eventId, userId, image) => {

    const newCommunity = new Community({
        name,
        description,
        eventId,
        userId,
        image
    });

    await newCommunity.save()


}

const getCommunites = async (req, res) => {
    try {
        const communities = await Community.find()
        res.status(200).json(communities)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getCommunityByid = async (req, res) => {
    const { id } = req.params;
    try {
        const community = await Community.findById(id)
        res.status(200).json(community)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}



module.exports = { createCommunity, getCommunites, getCommunityByid }
const Forum = require('../models/forums.models');
const User = require('../models/user.models');
// const { badges } = require('../utils/CheckBadges')
// const fs = require('fs');
// const path = require('path')
// const AWS = require('aws-sdk')
require('dotenv').config();


// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'ap-south-1'
// });

// const s3 = new AWS.S3();

const createforum = async (req, res) => {
    const { content, tags } = req.body;

    try {
        const author = req.user.id;
        console.log(author);
        const user = await User.findById(author)

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (!content) {
            return res.status(400).json({ msg: "Content is required" });
        }

        const forum = new Forum({
            content,
            author: author
        });



        if (req.file) {
            const file = req.file;
            const fileKey = Date.now() + '-' + file.originalname;

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            };


            await s3.upload(params, async (error, data) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: error.message });
                }

                if (data) {
                    forum.media = data.Location;
                }

                // Save the forum here after potentially setting the media property
                await forum.save();

                // Rest of your code for updating user and other actions
                console.log('Adding points....');
                user.points += 10;
                console.log('Added points....');
                console.log(user.points);
                await badges(user);
                user.forumsShowcased.push(forum._id);
                await user.save();

                res.status(201).json({ forum, user, msg: "New forum created" });
            });
        } else {
            // If there is no file, save the forum without the media property
            await forum.save();

            // Rest of your code for updating user and other actions
            console.log('Adding points....');
            user.points += 10;
            console.log('Added points....');
            console.log(user.points);
            await badges(user);
            user.forumsShowcased.push(forum._id);
            await user.save();

            res.status(201).json({ forum, user, msg: "New forum created" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

const deleteforum = async (req, res) => {
    const { id } = req.params;

    try {
        const forum = await forum.findById(id);
        const user = req.user._id;

        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (!forum) {
            res.status(400).json({ msg: 'No forum with this id' });
        }

        if (forum.author.toString() !== user.toString()) {
            return res.status(401).json({ msg: "You are not authorized to delete this forum" });
        }

        // Delete the file from AWS S3
        if (forum.media) {
            const s3Params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: forum.media.split('/').pop(),

            };

            await s3.deleteObject(s3Params).promise();
        }

        const deletedforum = await forum.findByIdAndDelete(id);
        existingUser.points -= 10;
        await existingUser.save();

        res.status(200).json({ msg: "forum deleted successfully", forum: deletedforum });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}



const getforums = async (req, res) => {
    try {
        const forums = await Forum.find().sort({ createdAt: -1 }).populate('author');
        const validforums = forums.filter(forum => forum.author && forum.author);
        const numberOfforums = validforums.length;

        res.status(200).json({ forums: validforums, mssg: "forums fetched successfully", qty: numberOfforums });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

const getforumById = async (req, res) => {
    const { id } = req.params;

    try {
        const forum = await forum.findById(id);
        if (!forum) {
            return res.status(400).json({ msg: "forum not found" });
        }
        res.status(200).json({ forum: forum, mssg: "forum fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}



const updateforum = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const forum = await forum.findById(id);
        const user = req.user._id;

        if (!forum) {
            res.status(400).json({ mssg: 'No forum with this id' });
        }

        if (forum.author.toString() !== user.toString()) {
            return res.status(401).json({ mssg: "You are not authorized to update this forum" });
        }

        forum.content = content;

        await forum.save();

        res.status(200).json({ forum: forum, mssg: "forum updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

const getforumByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const forums = await Forum.find({ author: userId })
            .sort({ createdAt: -1 })
            .populate("author", "-password");

        const numberOfforums = forums.length;

        res.status(200).json({ forums: forums, mssg: "forums fetched successfully", qty: numberOfforums });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

const saveforum = async (req, res) => {
    const { forumID } = req.params;
    try {
        const forum = await forum.findById(forumID);
        const user = req.user._id;

        if (!forum) {
            return res.status(400).json({ mssg: "forum not found" });
        }

        const isSaved = forum.savedBy.includes(user);

        if (isSaved) {
            forum.savedBy.pull(user);
            await forum.save();
            return res.status(200).json({ mssg: "forum unsaved successfully", forum: forum });
        } else {
            forum.savedBy.push(user);
            await forum.save();
            res.status(200).json({ mssg: "forum saved successfully", forum: forum });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}


const getSavedforums = async (req, res) => {
    try {
        const userID = req.user._id;
        const forums = await Forum.find({ savedBy: userID });

        if (!forums || forums.length === 0) {
            return res.status(401).json({ mssg: "You have not saved any forums" });
        }
        res.status(200).json({ mssg: "Saved forums fetched successfully", savedforums: forums });

    } catch (error) {
        res.status(500).json({ mssg: "Failed to fetch saved forums" });
        console.log("Error in getting saved forums", error);
    }
}


//get producrts by following
const getforumsByFollowing = async (req, res) => {
    try {
        const user = req.user._id;
        const currentUser = await User.findById(user);
        if (!currentUser) {
            return res.status(400).json({ msg: "User not found" });
        }

        const following = currentUser.following;
        const forums = await Forum.find({ author: { $in: following } })
            .sort({ createdAt: -1 })
            .populate("author", "-password");

        const numberOfforums = forums.length;

        if (numberOfforums === 0) {
            return res.status(200).json({ forums: forums, mssg: "No forums to show", qty: numberOfforums });
        }

        res.status(200).json({ forums: forums, mssg: "forums fetched successfully", qty: numberOfforums });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};



module.exports = {
    createforum,
    getforums,
    getforumById,
    deleteforum,
    getforumByUserId,
    updateforum,
    saveforum,
    getSavedforums,
    getforumsByFollowing

}

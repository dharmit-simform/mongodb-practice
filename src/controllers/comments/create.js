import commentsModel from '../../models/comments.js';
import postModel from '../../models/posts.js';
import userModel from '../../models/user.js';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default async (req, res, next) => {
    
    // Check for Proper Input Parameters
    if (!req.body.postId || !req.body.comment) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Proper Parameters Required',
            responseObject: []
        });
    }

    try {
        const newComment = new commentsModel({
            postId: req.body.postId,
            userId: req.user._id,
            body: req.body.comment
        });

        await newComment.save();

        return res.status(201).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: newComment
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: []
        });
    }
}
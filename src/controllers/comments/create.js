import commentsModel from '../../models/comments.js';
import postModel from '../../models/posts.js';
import userModel from '../../models/user.js';

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default async (req, res, next) => {

    // Insert Fake Comments data
    // const comments = await fetch("https://jsonplaceholder.typicode.com/comments").then(response => response.json());
    // const users = await userModel.find({}, { _id: 1 });
    // const posts = await postModel.find({}, { _id: 1 });

    // comments.forEach(comment => {
    //     delete comments.id;
    //     delete comment.name;
    //     delete comment.email;
    //     comment.userId = users[randomIntFromInterval(0, 9)]._id;
    //     comment.postId = posts[randomIntFromInterval(0, 99)]._id;
    // })

    // try {
    //     const insertedComments = await commentModel.insertMany(comments)
    //     return res.send(insertedComments)
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500);
    // }

    // Check for Proper Input Parameters
    if (!req.body.postId || !req.body.description) {
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
            body: req.body.description
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
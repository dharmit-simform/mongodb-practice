import postsModel from '../../models/posts.js'
import userModel from '../../models/user.js'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default async (req, res, next) => {

    // Check for Input Paramaters
    if (!req.body.title || !req.body.body || req.body.typeOfPost) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Title and description are required',
            responseObject: []
        });
    };

    try {
        const post = new postsModel({
            title: req.body.title,
            body: req.body.body,
            typeOfPost: req.body.typeOfPost,
            userId: req.user._id
        });

        await post.save();

        return res.status(201).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { post }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 1,
            responseMessage: 'Internal Server Error',
            responseObject: error
        });
    }

}
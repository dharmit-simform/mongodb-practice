import mongoose from "mongoose";
import commentsModel from "../../models/comments.js";
import postsModel from "../../models/posts.js"

export default async (req, res, next) => {

    // Check for Parameters
    if (!req.params.postId) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Provide Post ID',
            responseObject: []
        });
    }

    // Check if the Post exists
    try {
        const post = await postsModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.postId) });
        if (!post) {
            return res.status(400).send({
                responseCode: 0,
                responseMessage: 'No Posts exists with this ID',
                responseObject: []
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server error',
            responseObject: []
        });
    }

    // Get the comments along with the user's information
    try {
        const comments = await commentsModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $match: { postId: new mongoose.Types.ObjectId(req.params.postId) } },
            {
                $project: {
                    "userId": 0,
                    "postId": 0,
                    "userInfo.createdAt": 0,
                    "userInfo.updatedAt": 0,
                    "userInfo.address": 0,
                    "userInfo.__v": 0,
                    "userInfo.password": 0,
                    "userInfo.phone": 0,
                    "userInfo.website": 0,
                    "userInfo.email": 0,
                    "userInfo._id": 0,
                    "userInfo.is_active": 0,
                    "__v": 0,
                    "createdAt": 0,
                    "updatedAt": 0,
                    "is_active": 0,
                }
            }
        ]);

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { comments }
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
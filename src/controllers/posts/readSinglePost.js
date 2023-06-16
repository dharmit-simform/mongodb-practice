import mongoose from "mongoose";
import postsModel from "../../models/posts.js";

export default async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const post = await postsModel.findById({ _id: new mongoose.Types.ObjectId(postId) });

        if (!post) {
            return res.status(404).send({
                responseCode: 0,
                responseMessage: 'Not Found',
                responseObject: []
            });
        }

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: [{ post }]
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
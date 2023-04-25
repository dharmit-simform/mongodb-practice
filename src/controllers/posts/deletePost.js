import commentsModel from "../../models/comments.js";
import postsModel from "../../models/posts.js";

export default async (req, res, next) => {

    // Check for Proper Parameters
    if (!req.body.postId) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Provide Post ID',
            responseObject: []
        });
    }

    // Check if Post Exists with the 
    try {
        const post = await postsModel.findOne({ _id: req.body.postId, userId: req.user._id });
        if (!post) {
            return res.status(400).send({
                responseCode: 0,
                responseMessage: 'Post Does Not Exist',
                responseObject: []
            });
        }

        // Set is_active to false
        post.is_active = !post.is_active;

        // Set is_active to false of the comments related to this Post
        await commentsModel.updateMany({ postId: req.body.postId }, { $set: { is_active: 0 } });

        await post.save();

        return res.status(204).send({
            responseCode: 1,
            responseMessage: 'Deleted Successfully',
            responseObject: []
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
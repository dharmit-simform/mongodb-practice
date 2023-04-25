import postsModel from "../../models/posts.js";

export default async (req, res, next) => {

    // Check for Proper Paramters Passed
    if (!req.body.postId) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Provide a Post ID',
            responseObject: []
        });
    }

    const postId = req.body.postId;

    // Check if posts exists
    try {
        const post = await postsModel.findById({ _id: postId });

        if (!post) {
            return res.status(403).send({
                responseCode: 0,
                responseMessage: "Post Doesn't Exist",
                responseObject: []
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: "Internal Server Error",
            responseObject: error
        });

    }

    try {
        let updatedPost;
        let likedPost = await postsModel.find({ _id: postId, likes: req.user._id });

        // If Post is already liked then unlike
        // If Post is not yet liked then like it
        if (likedPost.length === 0) {
            updatedPost = await postsModel.findOneAndUpdate({ _id: postId }, { $push: { likes: req.user._id } }, { new: true });
        } else {
            updatedPost = await postsModel.findOneAndUpdate({ _id: postId }, { $pull: { likes: req.user._id } }, { new: true });
        }

        return res.status(200).send({
            responseCode: 1,
            responseMessage: "Success",
            responseObject: {
                likesCount: updatedPost.likes
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: "Internal Server Error",
            responseObject: error
        });

    }
}
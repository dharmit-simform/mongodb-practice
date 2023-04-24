import postsModel from "../../models/posts.js";

export default async (req, res, next) => {
    let post;
    const postId = req.body.postId;

    try {
        post = await postsModel.findById({ _id: postId });
        if (!post) {
            return res.status(403).send({
                responseCode: 0,
                responseMessage: "Post Doesn't Exist",
                responseObject: []
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: "Internal Server Error",
            responseObject: error
        })
    }

    try {
        let updatedPost;
        let likedPost = await postsModel.find({ _id: postId, likes: req.user._id });

        if (likedPost.length === 0) {
            updatedPost = await postsModel.findOneAndUpdate({ _id: postId }, { $push: { likes: req.user._id } }, { new: true })
        } else {
            updatedPost = await postsModel.findOneAndUpdate({ _id: postId }, { $pull: { likes: req.user._id } }, { new: true })
        }

        return res.status(200).send({
            responseCode: 1,
            responseMessage: "Success",
            responseObject: {
                updatedPost,
                likesCount: updatedPost.likes
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: "Internal Server Error",
            responseObject: error
        })
    }
}
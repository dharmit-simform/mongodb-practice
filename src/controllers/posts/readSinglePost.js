import postsModel from "../../models/posts.js";

export default async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const post = await postsModel.findById({ _id: postId });

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { post }
        })

    } catch (error) {
        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { post }
        })
    }
}
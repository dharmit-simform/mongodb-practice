import postsModel from "../../models/posts.js";

export default async (req, res, next) => {

    const userId = req.user._id || req.params.id;

    try {
        const posts = await postsModel.find({ userId: userId });
        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { posts }
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
import postsModel from '../../models/posts.js';

export default async (req, res, next) => {
    if (!req.params.filterType) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Provide a Filter Type',
            responseObject: []
        });
    };

    const filterType = req.params.filterType

    if (filterType === 'likes') {
        let mostLikedPost;
        try {
            mostLikedPost = await postsModel.aggregate([{ $project: { _id: 0, likes_count: { $size: "$likes" } } }, { $sort: { likes_count: -1 } }, { $limit: 1 }]);
        } catch (error) {
            console.log(error);
        }

        let start = parseInt(req.query.start) || 0;
        let end = parseInt(req.query.end) || mostLikedPost[0]['likes_count'];

        try {
            const posts = await postsModel.aggregate([
                {
                    $addFields: {
                        likes_count: {
                            $size: "$likes"
                        }
                    }
                },
                {
                    $match: {
                        likes_count: { $gte: start, $lte: end }
                    }
                }
            ]);

            return res.status(200).send({
                responseCode: 1,
                responseMessage: 'Success',
                responseObject: { posts }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                responseCode: 0,
                responseMessage: 'Internal Server Error',
                responseObject: []
            })
        }
    } else if (filterType === "date") {
        let startDate = req.query.startDate || new Date();
        let endDate = req.query.endDate || new Date();

        try {
            const posts = await postsModel.find({
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                }
            });

            res.status(200).send({
                responseCode: 1,
                responseMessage: 'Success',
                responseObject: { posts }
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                responseCode: 0,
                responseMessage: 'Internal Server Error',
                responseObject: []
            })
        }
    } else {
        res.status(400).send({
            responseCode: 0,
            responseMessage: 'Wrong Filter',
            responseObject: []
        })
    }
}
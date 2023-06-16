import postsModel from '../../models/posts.js';

export default async (req, res, next) => {
    let totalPostCount = 0;

    // Total number of posts
    try {
        totalPostCount = await postsModel.count({ is_active: 1 });
    } catch (error) {
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server error',
            responseObject: []
        });
    }

    // Pagination Parameters
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const totalPages = Math.ceil(totalPostCount / limit);
    let skip = (page - 1) * limit;

    // Sorting Parameter
    let sortBy = req.query.sortBy || '_id';

    try {
        const posts = await postsModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: "userInfo"
                }
            },
            { $match: { is_active: 1 } },
            { $sort: { [sortBy]: 1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    "userId": 0,
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
                    "createdAt": 0,
                    "updatedAt": 0,
                    "__v": 0,
                    "is_active": 0
                }
            }
        ]);

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: {
                totalPosts: totalPostCount,
                totalPages: totalPages,
                posts
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: []
        });

    }
}
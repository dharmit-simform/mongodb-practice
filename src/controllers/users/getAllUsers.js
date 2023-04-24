import userModel from "../../models/user.js";

export default async (req, res, next) => {

    let totalUserCount = 0;

    try {
        totalUserCount = await userModel.count({});
    } catch (error) {
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server error',
            responseObject: []
        })
    }
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const totalPages = Math.ceil(totalUserCount / limit);
    let skip = (page - 1) * limit;

    try {
        const users = await userModel.find({}, { _id: 1, name: 1, username: 1, email : 1, phone : 1 }, { limit: limit, skip: skip });
        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: {
                totalUsers: totalUserCount,
                totalPages: totalPages,
                users
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: []
        })
    }
}
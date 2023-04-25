import usersModel from "../../models/user.js";

export default async (req, res, next) => {

    // Total Number of Users
    let totalUserCount = 0;
    try {
        totalUserCount = await usersModel.count({ is_active: 1 });
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
    const totalPages = Math.ceil(totalUserCount / limit);
    let skip = (page - 1) * limit;

    try {
        const users = await usersModel.find({ is_active: 1 }, { _id: 1, name: 1, username: 1, email: 1, phone: 1 }, { limit: limit, skip: skip });
        
        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: {
                totalUsers: totalUserCount,
                totalPages: totalPages,
                users
            }
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
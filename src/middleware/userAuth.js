import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(403).send({
                responseCode: 0,
                responseMessage: "User Not Authenticated",
                responseObject: []
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userModel.findOne({ _id: decoded.userId });

        if (user.length === 0) {
            return res.status(403).send({
                responseCode: 0,
                responseMessage: "User Not Authenticated",
                responseObject: []
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).send({
            responseCode: 0,
            responseMessage: 'User Not Authenticated',
            responseObject: error
        })
    }
}
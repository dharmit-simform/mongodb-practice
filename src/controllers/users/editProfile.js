import usersModel from "../../models/user.js";
import bcrypt from 'bcryptjs';

export default async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'email', 'phone', 'website', 'address', 'username'];

    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Invalid Updates',
            responseObject: []
        });
    }

    try {
        if (updates.includes('username')) {
            const user = await usersModel.findOne({ username: updates.username });
            if (user) {
                return res.status(400).send({
                    responseCode: 0,
                    responseMessage: 'Username already exits',
                    responseObject: []
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: []
        })
    }

    try {
        let user = req.user;
        if (updates.includes('password')) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        updates.forEach(update => user[update] = req.body[update]);

        await user.save();

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Updated Successfully',
            responseObject: []
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: error
        })
    }
}
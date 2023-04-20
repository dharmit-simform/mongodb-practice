import userModel from '../../models/user.js';
import bcrypt from 'bcryptjs'

export default async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Please fill all the details',
            responseObject: []
        })
    }

    try {
        const user = await userModel.find({ username: req.body.username, email: req.body.email });
        if (user.length !== 0) {
            return res.status(400).send({
                responseCode: 0,
                responseMessage: 'User Already Exists',
                responseObject: []
            });
        }
    } catch (error) {
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'Internal Server Error',
            responseObject: { error }
        })
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            address: req.body.address,
            phone: req.body.contact,
            website: req.body.website
        });

        await user.save();

        return res.status(201).send({
            responseCode: 1,
            responseMessage: 'User Created Successfully',
            responseObject: user
        })

    } catch (error) {
        return res.status(500).send({
            responseCode: 0,
            responseMessage: 'User Already Exists',
            responseObject: error
        })
    }
}
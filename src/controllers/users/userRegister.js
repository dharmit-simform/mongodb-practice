import usersModel from '../../models/user.js';
import bcrypt from 'bcryptjs'

export default async (req, res, next) => {

    // To Insert Fake User Data into Database
    // const fakeUsers = await fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json());

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash("test@123", salt);
    // fakeUsers.forEach(user => {
    //     user.phone = user.phone.split(' ')[0];
    //     delete user.id;
    //     delete user.company
    //     user.password = hashedPassword
    // });

    // try {
    //     const users = await usersModel.insertMany(fakeUsers);
    //     return res.status(200).json(users);
    // } catch (error) {
    //     console.log(error);
    // }

    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Please fill all the details',
            responseObject: []
        })
    }

    try {
        const user = await usersModel.find({ username: req.body.username, email: req.body.email });
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
        const user = new usersModel({
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
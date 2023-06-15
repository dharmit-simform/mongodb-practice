import usersModel from '../../models/user.js';

export default async (req, res, next) => {

    // Check for Proper Parameters Passed
    if (!req.body.searchBy || !req.body.search) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Provide Search By and Search Keyword',
            responseObject: []
        });

    }

    // Search By Filter and Search Keyword
    const searchBy = req.body.searchBy;
    const searchKeyWord = req.body.search;

    // Check for valid filter
    const searchByFilters = ['name', 'username', 'email', 'phone', 'website'];
    if (!searchByFilters.includes(searchBy)) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Invalid Search Operation',
            responseCode: []
        });

    }

    try {
        const user = await usersModel.find({ [searchBy]: { '$regex': searchKeyWord, '$options': 'i' } });

        return res.status(200).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: {
                user: [
                    {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        website: user.website
                    }
                ]
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
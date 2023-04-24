export default async (req, res, next) => {
    const userProfile = req.user;
    delete userProfile.password;

    res.status(200).send({
        responseCode: 1,
        responseMessage: 'Success',
        responseObject: { profile: userProfile }
    })
}
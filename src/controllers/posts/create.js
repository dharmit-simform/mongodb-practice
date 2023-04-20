import postModel from '../../models/posts.js'
export default async (req, res, next) => {

    const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())

    let userId = 1;
    const postsToInsert = posts.filter(post => post.userId === userId);

    postsToInsert.forEach(post => {
        post.userId = req.user._id;
        delete post.id
    })

    // if (!req.body.title || !req.body.description) {
    //     return res.status(400).send({
    //         responseCode: 0,
    //         responseMessage: 'Title and description are required',
    //         responseObject: []
    //     })
    // }
    try {
        // const post = new postModel({
        //     title: req.body.title,
        //     body: req.body.description,
        //     userId: req.user._id
        // })

        const posts = await postModel.insertMany(postsToInsert);

        // await post.save();

        return res.status(201).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: posts
        })
    } catch (error) {
        return res.status(500).send({
            responseCode: 1,
            responseMessage: 'Internal Server Error',
            responseObject: error
        })
    }

}
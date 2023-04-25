import postsModel from '../../models/posts.js'
import userModel from '../../models/user.js'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export default async (req, res, next) => {

    // To insert fake post data
    // let genres = ['Action', 'Animation', 'Comedy', 'Crime', 'Drama', 'Historical', 'Sci-Fi'];
    // const users = await userModel.find({}, { _id: 1 });
    // const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json())

    // let userIndex = 0;
    // for (let postIndex = 1; postIndex < posts.length; postIndex++) {
    //     if (posts[postIndex].userId === posts[postIndex - 1].userId) {
    //         posts[postIndex].newUserId = users[userIndex]._id;
    //     }
    //     else {
    //         ++userIndex;
    //         posts[postIndex].newUserId = users[userIndex]._id;
    //     }
    // }
    // posts[0]['newUserId'] = users[0]['_id']

    // posts.forEach(post => {
    //     delete post.id
    //     post.userId = post.newUserId;
    //     delete post.newUserId;
    //     post.typeOfPost = genres[randomIntFromInterval(0, 6)];
    // })


    // try {
    //     let insertedPosts = await postsModel.insertMany(posts);
    //     return res.status(201).send({
    //         responseCode: 1,
    //         responseMessage: 'Success',
    //         responseObject: insertedPosts
    //     })
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send({
    //         responseCode: 0,
    //         responseMessage: 'Internal Server Error',
    //         responseObject: []
    //     })
    // }

    // Check for Input Paramaters
    if (!req.body.title || !req.body.body || req.body.typeOfPost) {
        return res.status(400).send({
            responseCode: 0,
            responseMessage: 'Title and description are required',
            responseObject: []
        });
    };

    try {
        const post = new postsModel({
            title: req.body.title,
            body: req.body.body,
            typeOfPost: req.body.typeOfPost,
            userId: req.user._id
        });

        await post.save();

        return res.status(201).send({
            responseCode: 1,
            responseMessage: 'Success',
            responseObject: { post }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            responseCode: 1,
            responseMessage: 'Internal Server Error',
            responseObject: error
        });
    }

}
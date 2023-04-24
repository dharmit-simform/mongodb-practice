import express from "express";
import createPost from "../controllers/posts/createPost.js";
import auth from "../middleware/userAuth.js";
import userAuth from "../middleware/userAuth.js";
import deletePost from "../controllers/posts/deletePost.js";
import editPost from "../controllers/posts/editPost.js";
import likePost from "../controllers/posts/likePost.js";
import filterPosts from "../controllers/posts/filterPosts.js";
import readAllPosts from "../controllers/posts/readAllPosts.js";
import readUserPosts from "../controllers/posts/readUserPosts.js";
import readSinglePost from "../controllers/posts/readSinglePost.js";
const router = express.Router();

router.post('/create-post', auth, async (req, res, next) => {
    await createPost(req, res, next);
});

router.get('/all-posts', async (req, res, next) => {
    await readAllPosts(req, res, next);
});

router.delete('/delete-post', userAuth, async (req, res, next) => {
    await deletePost(req, res, next);
});

router.put('/edit-post', userAuth, async (req, res, next) => {
    await editPost(req, res, next);
});

router.put('/like-post', userAuth, async (req, res, next) => {
    await likePost(req, res, next);
});

router.get('/filter-post/:filterType', async (req, res, next) => {
    await filterPosts(req, res, next);
});

router.get('/my-posts', userAuth, async (req, res, next) => {
    await readUserPosts(req, res, next);
});

router.get('/single-post/:postId', async (req, res, next) => {
    await readSinglePost(req, res, next);
});

export default router;
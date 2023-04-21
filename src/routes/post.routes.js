import express from "express";
import createPost from "../controllers/posts/createPost.js";
import auth from "../middleware/userAuth.js";
import userAuth from "../middleware/userAuth.js";
import deletePost from "../controllers/posts/deletePost.js";
import editPost from "../controllers/posts/editPost.js";
const router = express.Router();

router.post('/create-post', auth, async (req, res, next) => {
    await createPost(req, res, next);
});

router.get('/all-posts', async (req, res, next) => {
    await getAllPosts(req, res, next);
});

router.delete('/delete-post', userAuth, async (req, res, next) => {
    await deletePost(req, res, next);
});

router.put('/edit-post', userAuth, async (req, res, next) => {
    await editPost(req, res, next);
});

export default router;
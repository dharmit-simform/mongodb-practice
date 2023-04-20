import express from "express";
import login from "../controllers/login-register/login.js";
import register from "../controllers/login-register/register.js";
import auth from "../middleware/auth.js";
import createPost from "../controllers/posts/create.js";

const router = express.Router();

router.post('/login', async (req, res, next) => {
    await login(req, res, next);
});

router.post('/register', async (req, res, next) => {
    await register(req, res, next);
});

router.post('/create-post', auth, async (req, res, next) => {
    await createPost(req, res, next);
})

export default router;
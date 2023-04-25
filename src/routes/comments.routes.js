import express from "express";
import auth from "../middleware/userAuth.js";
import createComment from "../controllers/comments/create.js";
import getComments from "../controllers/comments/getComments.js";

const router = express.Router();

router.post('/comment', auth, async (req, res, next) => {
    await createComment(req, res, next);
});

router.post('/get-comments', auth, async (req, res, next) => {
    await getComments(req, res, next);
});

export default router;
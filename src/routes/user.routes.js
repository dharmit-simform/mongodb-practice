import express from "express";
import login from "../controllers/users/userLogin.js";
import register from "../controllers/users/userRegister.js";
import getAllUsers from "../controllers/users/getAllUsers.js";
import auth from "../middleware/userAuth.js";
import getProfile from "../controllers/users/getProfile.js";
import editProfile from "../controllers/users/editProfile.js";

const router = express.Router();

router.post('/login', async (req, res, next) => {
    await login(req, res, next);
});

router.post('/register', async (req, res, next) => {
    await register(req, res, next);
});

router.get('/all-users', async (req, res, next) => {
    await getAllUsers(req, res, next);
})

router.get('/profile', auth, async (req, res, next) => {
    await getProfile(req, res, next);
})

router.put('/edit-profile', auth, async (req, res, next) => {
    await editProfile(req, res, next);
})

export default router;
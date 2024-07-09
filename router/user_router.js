import express from "express";
import { login, signup } from "../controllers/auth/userAuth_controller.js";
import { deleteUser } from "../controllers/user/user.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const userAuthRouter = express.Router()

userAuthRouter.route('/signup').post(signup)
userAuthRouter.route('/login').post(login)

userAuthRouter.route('/delete').delete(checkAuth, deleteUser)


export default userAuthRouter
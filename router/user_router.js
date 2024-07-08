import express from "express";
import { login, signup } from "../controllers/userAuth_controller.js";

const userAuthRouter = express.Router()

userAuthRouter.route('/signup').post(signup)
userAuthRouter.route('/login').post(login)

export default userAuthRouter
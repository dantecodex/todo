import express from "express";
import { createUserTasks, readUserTasks } from "../controllers/task_controller.js";

const taskRouter = express.Router()

taskRouter.route('/').get(readUserTasks)
taskRouter.route('/').post(createUserTasks)

export default taskRouter
import express from "express";

import { deleteUserSubTasks, deleteUserTasks } from "../controllers/tasks/delete/deleteTask_controller.js";
import { createUserSubTasks, createUserTasks } from "../controllers/tasks/create/createTask_controller.js";
import updateUserSubTasks from "../controllers/tasks/update/updateTask_controller.js";
import { readUserTasks } from "../controllers/tasks/read/readTask_controller.js";

const taskRouter = express.Router()

// Get tasks and sub-task of logged in user
taskRouter.route('/').get(readUserTasks)


// create task and subtaks
taskRouter.route('/').post(createUserTasks)
taskRouter.route('/sub-task/:taskId').post(createUserSubTasks)


// update subTask
taskRouter.route('/sub-task/:subTaskId').patch(updateUserSubTasks)


// delete task and subtask
taskRouter.route('/:taskId').delete(deleteUserTasks)
taskRouter.route('/sub-task/:subTaskId').delete(deleteUserSubTasks)


export default taskRouter
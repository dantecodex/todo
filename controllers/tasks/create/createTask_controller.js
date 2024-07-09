import prisma from "../../../prisma/prismaSetup.js"
import { subTaskCreationDataValidation, taskCreationDataValidation } from "../../../request/task/createTaskValidation.js"
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js"

const createUserTasks = asyncErrorHandler(async (req, res) => {

    const { error, value } = taskCreationDataValidation.validate(req.body)
    if (error) {
        throw new CustomError(error.message, 400)
    }
    value.usersId = req.user?.id

    const newTask = await prisma.tasks.create({
        data: value
    })

    if (!newTask) {
        throw new CustomError("Unable to create new task", 500)
    }

    res.status(201).json({
        newTask
    })
})

const createUserSubTasks = asyncErrorHandler(async (req, res) => {
    const taskId = parseInt(req.params.taskId);

    if (!taskId) {
        throw new CustomError("Task ID parameter is required", 400)
    }

    const task = await prisma.tasks.findFirst({
        where: {
            id: taskId,
            usersId: req.user?.id
        }
    })

    if (!task) {
        throw new CustomError("Task not found or you do not have permission to create subtasks for this task", 403)
    }

    const { error, value } = subTaskCreationDataValidation.validate(req.body)
    if (error) {
        throw new CustomError(error.message, 400)
    }

    value.tasksId = taskId

    const newSubTask = await prisma.subTasks.create({
        data: value
    })

    if (!newSubTask) {
        throw new CustomError("Unable to create new task", 500)
    }

    res.status(201).json({
        newSubTask
    })
})

export { createUserSubTasks, createUserTasks }
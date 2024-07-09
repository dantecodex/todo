import prisma from "../../../prisma/prismaSetup.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import CustomError from "../../../utils/customErrorHandler.js";

const deleteUserTasks = asyncErrorHandler(async (req, res) => {
    const taskId = parseInt(req.params?.taskId);

    if (!taskId) {
        throw new CustomError("Task ID parameter is required for deleting task", 400);
    }

    const task = await prisma.tasks.findFirst({
        where: {
            id: taskId,
            usersId: req.user?.id
        }
    });

    if (!task) {
        throw new CustomError("Task not found or you do not have permission to delete this task", 403);
    }

    await prisma.tasks.delete({
        where: {
            id: taskId
        }
    })

    res.status(204).json({
        status: "deleted"
    })
})

const deleteUserSubTasks = asyncErrorHandler(async (req, res) => {
    const subTaskId = parseInt(req.params?.subTaskId);

    if (!subTaskId) {
        throw new CustomError("Sub Task ID parameter is required for deleting subtask", 400);
    }

    const subTask = await prisma.subTasks.findFirst({
        where: {
            id: subTaskId,
            task: {
                usersId: req.user?.id,
            },
        }
    });

    if (!subTask) {
        throw new CustomError("Sub Task not found or you do not have permission to delete subtasks for this task", 403);
    }

    await prisma.subTasks.delete({
        where: {
            id: subTaskId
        }
    })

    res.status(204).json({
        status: "deleted"
    })
})

export { deleteUserTasks, deleteUserSubTasks }
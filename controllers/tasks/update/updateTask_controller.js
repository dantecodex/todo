import prisma from "../../../prisma/prismaSetup.js";
import { subTaskUpdationDataValidation } from "../../../request/task/updateSubTaskValidation.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import CustomError from "../../../utils/customErrorHandler.js";

const updateUserSubTasks = asyncErrorHandler(async (req, res) => {
    const subTaskId = parseInt(req.params?.subTaskId);

    if (!subTaskId) {
        throw new CustomError("Sub Task ID parameter is required for updating subtask", 400);
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
        throw new CustomError("Sub Task not found or you do not have permission to update subtasks for this task", 403);
    }

    const { error, value } = subTaskUpdationDataValidation.validate(req.body);
    if (error) {
        throw new CustomError(error.message, 400);
    }
    if (value.completed) {
        value.completed_at = new Date();
    }

    const updatedSubTask = await prisma.subTasks.update({
        where: {
            id: subTaskId,
        },
        data: value,
    });

    if (!updatedSubTask) {
        throw new CustomError("Unable to update subtask", 500);
    }

    res.status(200).json({
        status: "success",
        updatedSubTask,
    });
});

export default updateUserSubTasks
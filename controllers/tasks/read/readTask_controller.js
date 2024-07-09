import prisma from "../../../prisma/prismaSetup.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import CustomError from "../../../utils/customErrorHandler.js";

const readUserTasks = asyncErrorHandler(async (req, res) => {
    const userTasks = await prisma.tasks.findMany({
        where: {
            usersId: req.user?.id
        },
        include: {
            subTasks: true
        }
    })
    if (!userTasks.length) {
        throw new CustomError("No tasks found for this user", 404)
    }

    res.status(200).json({
        userTasks
    })
})



export { readUserTasks }
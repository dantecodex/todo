import prisma from "../../prisma/prismaSetup.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";

const deleteUser = asyncErrorHandler(async (req, res) => {
    await prisma.users.delete({
        where: {
            id: req.user?.id
        }
    })

    res.status(204).json({
        status: "deleted"
    })
})

export { deleteUser }
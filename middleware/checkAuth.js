import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";
import prisma from '../prisma/prismaSetup.js'

const checkAuth = asyncErrorHandler(async (req, res, next) => {
    const receivedToken = req.headers.authorization?.split(' ')[1]
    if (!receivedToken) {
        throw new CustomError("Token does not exist", 401)
    }

    const { id, username } = jwt.verify(receivedToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new CustomError(err.message, 401)
        }
        return decoded
    })

    const user = await prisma.users.findFirst({
        where: {
            id,
            username
        }
    })

    if (!user) {
        throw new CustomError("User does not exist with the received token", 401)
    }
    req.user = user
    next()
})

export default checkAuth
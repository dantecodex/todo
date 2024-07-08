import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";
import { prisma } from "../app.js";

const checkAuth = asyncErrorHandler(async (req, res, next) => {
    const receivedToken = req.headers?.authorization.split(' ')[1]
    if (!receivedToken) {
        throw new CustomError("Token does not exist", 400)
    }

    const decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new CustomError(err.message, err.statusCode)
        }
        return decoded
    })

    const { id, username } = decodedToken
    if (!id, !username) {
        throw new CustomError("Something wrong with the received token", 400)
    }

    const user = await prisma.users.findFirst({
        where: {
            id,
            username
        }
    })

    if (!user) {
        throw new CustomError("User does not exist with the received token", 400)
    }
    req.user = user
    next()
})

export default checkAuth
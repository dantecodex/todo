import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '../app.js'
import CustomError from '../utils/customErrorHandler.js'
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import { userLoginDataValidation, userSignUpDataValidation } from '../utils/validation.js'



const generateToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_TIME
    })
}

const comparePasswordInDB = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword)
}

const signup = asyncErrorHandler(async (req, res) => {
    const { error, value } = userSignUpDataValidation.validate(req.body)
    if (error) {
        throw error
    }
    value.password = await bcrypt.hash(value?.password, 12)

    const user = await prisma.Users.create({
        data: value
    })

    if (!user) {
        throw new CustomError("Unable to create User", 400)
    }

    const token = generateToken(user.id, user.username)
    res.status(201).json({ token, user })
})

const login = asyncErrorHandler(async (req, res) => {
    const { error, value } = userLoginDataValidation.validate(req.body)
    if (error) {
        throw error
    }

    const user = await prisma.users.findUnique({
        where: {
            username: value.username
        }
    })
    if (!user || !(await comparePasswordInDB(value.password, user.password))) {
        throw new CustomError("Invalid user credentials", 401)
    }

    const token = generateToken(user.id, user.username)
    res.status(200).json({ token, user })
})

export { signup, login }
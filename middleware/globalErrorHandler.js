import CustomError from "../utils/customErrorHandler.js"

const devError = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error
    })
}

const duplicateUsernameHandler = () => {
    return new CustomError("Username already exist", 400)
}

const prodError = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })
    }
    else {
        res.status(500).json({
            status: "Error",
            message: "Uncaught Error occured"
        })
    }
}

const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'

    if (process.env.ENVI === 'dev') {
        devError(error, res)
    }

    if (error.code === 'P2002') {
        error = duplicateUsernameHandler()
    }

    if (process.env.ENVI === 'prod') {
        prodError(error, res)
    }
}

export default globalErrorHandler
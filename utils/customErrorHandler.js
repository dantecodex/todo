class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = this.getStatusName(statusCode)
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    getStatusName(statusCode) {
        const statusNames = {
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not Found",
            500: "Internal Server Error",
        };
        return statusNames[statusCode] || ((statusCode >= 400 && statusCode < 500) ? "Uncaught Failed Status" : "Server Error")
    }
}

export default CustomError
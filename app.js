import express from "express";

import userAuthRouter from "./router/user_router.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import checkAuth from "./middleware/checkAuth.js";
import taskRouter from "./router/task_router.js";

const app = express()

app.use(express.json())

app.use('/api/v1/user', userAuthRouter)
app.use('/api/v1/task', checkAuth, taskRouter)


app.get('/', checkAuth, (req, res) => {
    res.send('welcome to my homepage')
})

app.use(globalErrorHandler)

app.listen(2020, () => {
    console.log('Server has been started on port 2020');
})
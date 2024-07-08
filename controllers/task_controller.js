import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const readUserTasks = asyncErrorHandler(async (req, res) => {

})

const createUserTasks = asyncErrorHandler(async (req, res) => {
    console.log(req.user);
})


export { readUserTasks, createUserTasks }
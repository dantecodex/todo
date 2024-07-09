import Joi from "joi";

const taskCreationDataValidation = Joi.object({
    task_name: Joi.string().min(2).max(120).trim().lowercase().required(),
})

const subTaskCreationDataValidation = Joi.object({
    description: Joi.string().min(2).trim().lowercase().required(),
})

export { taskCreationDataValidation, subTaskCreationDataValidation }
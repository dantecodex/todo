import Joi from "joi";

const subTaskUpdationDataValidation = Joi.object({
    completed: Joi.boolean().invalid(false)
})

export { subTaskUpdationDataValidation }
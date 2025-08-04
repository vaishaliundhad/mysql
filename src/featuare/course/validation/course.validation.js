
import Joi from "joi";
export const courseValidation = Joi.object({
     userId: Joi.string()
    .uuid({ version: 'uuidv4' }) // or omit `{ version }` for any UUID
    .optional()
    .messages({
      "string.guid": "Invalid userId format",
      "string.base": "userId must be a string"
    }),

    title: Joi.string().min(3).required().messages({
        "string.empty": "title is required",
        "string.min": "title must be at least 3 characters long",
        "string.required": "title is required"
    }),

    description: Joi.string().min(3).max(100).required().messages({
        "string.empty": "description is required",
        "string.min": "description must be at least 3 characters long",
        "string.max": "description must be less than or equal to 100 characters",
        "string.required": "description is required"
    }),

    price: Joi.number().min(0).required().messages({
        "number.base": "price must be a number",
        "number.min": "price must be at least 0",
        "any.required": "price is required"
    }),

    duration: Joi.string().min(1).required().messages({
        "string.base": "duration must be a string",
        "string.empty": "duration is required",
        "any.required": "duration is required"
    }),

    level: Joi.string().valid("beginner", "intermediate", "advanced").required().messages({
        "any.only": "level must be one of: beginner, intermediate, advanced",
        "any.required": "level is required"
    }),

    isActive: Joi.boolean().required().messages({
        "boolean.base": "isActive must be true or false",
        "any.required": "isActive is required"
    })
});

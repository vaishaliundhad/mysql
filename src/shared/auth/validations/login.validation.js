import Joi from 'joi';

 export const loginSchemaValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty":"email is required",
    "string.email":"email must be valid email address",
    "any.required":"email is required"
  }),
  password : Joi.string().min(6).required().messages({
    "string.empty":"password is required",
    "string.min":"Password must be at least 6 characters",
    "any.required":"password is required"
  })
 })
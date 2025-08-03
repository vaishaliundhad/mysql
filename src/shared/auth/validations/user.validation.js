import Joi from "joi";

export const authSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().uri().required().messages({
    "string.empty": "image  is required",
    "string.uri": "image must be valid url",
    "any.required": "image is required",
  }),
  phone: Joi.string().required(),
  address: Joi.string().min(5).required(),
  role: Joi.string().valid("user", "admin").messages({
    "any.only": "role must be user and admin",
  }),
  status: Joi.boolean().required().messages({
    "boolean.base": "status must be true or false",
    "any.required": "status is required",
  }),
  isVerified: Joi.boolean().optional(),
});

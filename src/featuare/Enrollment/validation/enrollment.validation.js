import Joi from "joi";

export const enrollmentSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.empty": "userId is required",
    "string.uuid": "userId must be a valid UUID",
  }),
  courseId: Joi.string().required().messages({
    "string.empty": "courseId is required",
    "string.requird": "courseid is required",
  }),
 enrolledAt: Joi.date().required().messages({
    "date.base": "enrolledAt must be a valid date",
    "any.required": "enrolledAt is required",
  }),
  status: Joi.string()
    .valid("enrolled", "completed", "cancelled")
    .required()
    .messages({
      "string.empty": "status is required",
      "any.only": "status must be one of enrolled, completed, cancelled",
    }),
  progress: Joi.number().required().min(0).max(100).messages({
    "string.empty": "progress is required",
    "string.required": "progress is required",
    "string.min": "progresss must be at least min 0",
    "string.max": "progress must be at least max 100",
  }),
});

import Joi from "joi";

// using Joi to create validation for the user being created before sent to database
export const contactValidator = Joi.object({
  contactName: Joi.string().required(),
  contactEmail: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Not a valid email address. Please input a valid email address.",
    }),
  message: Joi.string(),
  loginURL: Joi.string(),
}).strict();
import Joi from "joi";

// using Joi to create validation for the user being created before sent to database
const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Not a valid email address. Please input a valid email address.",
    }),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be more than 8 characters long with at least one number, one alphanumeric character, one uppercase letter",
    }),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
        "string.pattern.base": "Password must match"
    })
}).strict();

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required()
});


export { createUserValidator, loginSchema };

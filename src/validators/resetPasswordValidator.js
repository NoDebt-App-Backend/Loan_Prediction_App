import Joi from "joi";

const emailValidator = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
    }),
}).strict();

const tokenValidator = Joi.object({
  fiveDigitToken: Joi.string().required(),
}).strict();

const resetPasswordValidator = Joi.object({
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be more than 8 characters long with at least one number, one special character, one uppercase letter",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Passwords")
    .messages({ "any.only": "{{#label}} do not match. Please check again" }),
}).strict();

export { emailValidator, tokenValidator, resetPasswordValidator };

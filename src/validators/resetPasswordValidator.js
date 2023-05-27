import Joi from "joi";

const resetPasswordValidator = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
    }), 
  fiveDigitToken: Joi.number().required(),
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

export { resetPasswordValidator };

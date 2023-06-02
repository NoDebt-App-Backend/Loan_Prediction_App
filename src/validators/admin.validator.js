import Joi from "joi";

// using Joi to create validation for the user being created before sent to database
const createCompanyValidator = Joi.object({
  companyName: Joi.string().required(),
  firstName: Joi.string().required(),
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
    .equal(Joi.ref("password"))
    .required()
    .label("Passwords")
    .messages({ "any.only": "{{#label}} do not match. Please check again" })
}).strict();

const loginAdminValidator = Joi.object(
  {
    email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Not a valid email address. Please input a valid email address.",
    }),
    password: Joi.string().required().messages({
      "string.pattern.base":
        "Not a valid email address or password",
    })
  }
)

export  {createCompanyValidator, loginAdminValidator} ;
import Joi from "joi";

// using Joi to create validation for the user being created before sent to database
const createCompanyValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
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
        "Password must be more than 8 characters long with at least one number, one special character, one uppercase letter and one lowercase letter",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    // .required()
    .label("Passwords")
    .messages({ "any.only": "{{#label}} do not match. Please check again" }),
  organisationName: Joi.string().required(),
  password: Joi.string(),
  facebookId: Joi.string(),
  passwordLink: Joi.string(),
  loginURL: Joi.string(),
}).strict();

const loginAdminValidator = Joi.object({
  email: Joi.string().required().messages({
    "string.pattern.base": "Not a valid email address or password",
  }),
  password: Joi.string().required().messages({
    "string.pattern.base": "Not a valid email address or password",
  }),
}).strict();

const changePasswordValidator = Joi.object({
  oldPassword: Joi.any().equal(Joi.ref("password")).required().messages({
    "string.pattern.base":
      "Password is not correct. Kindly input the correct password",
  }),
  newPassword: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be more than 8 characters long with at least one number, one special character, one uppercase letter and one lowercase letter",
    }),
  confirmNewPassword: Joi.any()
    .equal(Joi.ref("newPassword"))
    .required()
    .label("Passwords")
    .messages({ "any.only": "{{#label}} do not match. Please check again" }),
}).strict();

const updateAdminValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  organisationEmail: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.pattern.base":
        "Not a valid email address. Please input a valid email address.",
    }),
  numberOfStaffs: Joi.number(),
  staffID: Joi.string(),
  organisationType: Joi.string(),
  website: Joi.string(),
  position: Joi.string(),
  phoneNumber: Joi.string().regex(/^\+\d{1,3}\d{6,14}$/).messages({
    "string.pattern.base": "Phone number format invalid e.g +2348000000000",
  }),
  role: Joi.string(),
  profileImage: Joi.string(),
  imageUrl: Joi.string(),
});

const addAdminValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required()
  .messages({
    "string.pattern.base":
      "Not a valid email address. Please input a valid email address.",
  }),
  phoneNumber: Joi.string().regex(/^\+\d{1,3}\d{6,14}$/).required().messages({
    "string.pattern.base": "Phone number format invalid e.g +2348000000000",
  }),
  role: Joi.string().required(),
  loginURL: Joi.string().optional()
}).strict();

export {
  createCompanyValidator,
  loginAdminValidator,
  updateAdminValidator,
  changePasswordValidator,
  addAdminValidator
};

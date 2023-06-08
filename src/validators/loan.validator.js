import Joi from "joi";
import JoiMongoId from "joi-objectid";

Joi.objectId = JoiMongoId(Joi);

const createLoanValidator = Joi.object({
  user: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  fullname: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
  address: Joi.string().required(),
  employmentType: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^(\+\d{1,})?\d{10,}$/)
    .required(),
  dateOfBirth: Joi.string().required(),
  nationalIdentityNumber: Joi.string().required(),
  incomePerMonth: Joi.number().required(),
  loanType: Joi.string().required(),
  repaymentType: Joi.string().required(),
  purposeOfLoan: Joi.string().min(100).required(),
  collateralType: Joi.string().required(),
  collateralValue: Joi.number().required(),
  eligibility: Joi.string().optional(),
  collateralInformation: Joi.string().required(),
  creditScore: Joi.number().optional(),
  guarantor: Joi.object({
    fullname: Joi.string().required(),
    phoneNumber: Joi.string()
      .pattern(/^(\+\d{1,})?\d{10,}$/)
      .required(),
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base": "Email is not a valid email format/address",
      }),
    dateOfBirth: Joi.string().required(),
    address: Joi.string().required(),
    socialSecurityNumber: Joi.string().required(),
    relationship: Joi.string().required(),
    employment: Joi.string().required(),
    incomePerMonth: Joi.number().required(),
    otherSourcesOfIncome: Joi.string().optional(),
  }).required(),
}).strict();

export { createLoanValidator };

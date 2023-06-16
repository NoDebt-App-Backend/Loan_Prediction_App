import Joi from "joi";
import JoiMongoId from "joi-objectid";

Joi.objectId = JoiMongoId(Joi);

const createLoanValidator = Joi.object({
  organisation: Joi.objectId().optional(),
  organisationId: Joi.objectId().optional(),
  organisationName: Joi.objectId().optional(),
  eligibility: Joi.boolean().optional(),
  fullname: Joi.string()
    .regex(/^(?!.*\d)[^\d\s]+\s+[^\d\s]+.*$/)
    .required()
    .messages({
      "string.pattern.base": "Full name is required",
    }),
  gender: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
  maritalStatus: Joi.string().required(),
  address: Joi.string().required(),
  employmentType: Joi.string().required(),
  jobRole: Joi.string().required(),
  jobSector: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{1,3}\d{6,14}$/)
    .required(),
  age: Joi.number().required(),
  nationalIdentityNumber: Joi.string().required(),
  incomePerMonth: Joi.number().required(),
  loanType: Joi.string().required(),
  repaymentType: Joi.string().required(),
  purposeOfLoan: Joi.string().required().min(50),
  collateralType: Joi.string().required(),
  collateralValue: Joi.number().required(),
  eligibility: Joi.string().optional(),
  collateralInformation: Joi.string().min(50).required(),
  creditScore: Joi.number().optional(),
  loanAmount: Joi.number().required(),
  reasonForEligibilityStatusResult: Joi.string().optional(),
  financialAdvice: Joi.string().optional(),
  adminInCharge: Joi.string().optional(),
  guarantor: Joi.object({
    fullname: Joi.string()
      .regex(/^(?!.*\d)[^\d\s]+\s+[^\d\s]+.*$/)
      .required()
      .messages({
        "string.pattern.base": "Full name is required",
      }),
    phoneNumber: Joi.string()
      .pattern(/^\+\d{1,3}\d{6,14}$/)
      .required(),
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base": "Email is not a valid email format/address",
      }),
    age: Joi.number().required(),
    address: Joi.string().required(),
    socialSecurityNumber: Joi.string().required(),
    relationship: Joi.string().required(),
    employmentType: Joi.string().required(),
    incomePerMonth: Joi.number().required(),
    otherSourcesOfIncome: Joi.string().required(),
  }).required(),
}).strict();

export { createLoanValidator };

import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')) //password should have at least one upper or lower case and one digit
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required()
});

export default { signupSchema, loginSchema };

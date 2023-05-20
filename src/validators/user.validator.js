const Joi = require('joi');


const signupSchema = joi.object({
    username: Joi.string().required(),
    email:Joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ['.com', '.net']}
    }).required(),
    password: Joi.string().required().min(8).pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')) //password should have a atleast one upper or lower case and one digiit
} 
);

const loginSchema = Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().required
});

module.exports={signupSchema, loginSchema};

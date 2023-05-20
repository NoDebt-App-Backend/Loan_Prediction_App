const User = require("../models/user.model");
const Validator = require("../utils/validationSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()



const Login = async function(req, res){
    try{
        const {identifier, password} = req.body;

        const {error} = Validator.Login.validate(req.body);
        if(error){
            return res.status(401).json({
                error:error.details[0].message
            })
        }
    const user = await User.findOne().or([{username:identifier}, {email:identifier}]);
    if(!user){
        res.status(401).json({
            error: "username/email/password is not correct"
        })
    }

    const PasswordMatch = await bcrypt.compare(password, user.password)
    if(!PasswordMatch){
        return res.status(401).json({
            error: "username/email/password is not correct"
        })
        
    }
    const token = jwt.sign({userId:user._id}, process.env.secret_key,{expiresIn: 60*60} );

    return res.json({token})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

const protectedRoute = async (req, res) => {
    // Route logic for authenticated users only
    res.json({ message: 'Protected route accessed successfully' });
  };
  

module.exports = {Login, protectedRoute};



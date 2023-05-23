import bcrypt from 'bcrypt';
import { BadUserRequestError } from "../error/error.js";
import User from "../model/user.model.js";
import { createUserValidator, loginSchema } from "../validators/user.validator.js";
import { config } from '../config/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export default class UserController {
  static async createUser(req, res) {

    // Validation with Joi before it gets to the database
    const { value, error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const validateEmail = await User.find({ email: req.body.email });
    if (validateEmail.length > 0)
      throw new BadUserRequestError("An account with this email already exists");
    const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    // Create new user account
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    // save to mongoose database
    await user.save();

    // Return a response to the client
    res.status(200).json({
      message: "Account created successfully",
      status: "Success",
      data: {
        user: user,
      },
    });
  }


  static async Login (req, res) {
    const { identifier, password } = req.body;
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(401).json({
          error: error.details[0].message,
        });
      }
  
      const user = await User.findOne().or([{ name: identifier }, { email: identifier }]);
      if (!user) {
        return res.status(401).json({
          error: 'Username/email/password is not correct',
        });
      }
  
      const PasswordMatch = await bcrypt.compare(password, user.password);
      if (!PasswordMatch) {
        return res.status(401).json({
          error: 'Password is not correct',
        });
      }
      const payload = user._id
      const token = await jwt.sign({ payload }, process.env.JWT_KEY, { expiresIn: 60*60*24 });
      return res.json({ token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
   static async protectedRoute (req, res) {
    // Route logic for authenticated users only
    res.json({ message: 'Protected route accessed successfully' });
  };
}

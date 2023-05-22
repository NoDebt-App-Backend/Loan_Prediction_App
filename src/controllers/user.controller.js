import bcrypt from 'bcrypt';
import { BadUserRequestError } from "../error/error.js";
import User from "../model/user.model.js";
import { createUserValidator } from "../validators/user.validator.js";
import { config } from '../config/index.js';

export default class UserController {
  static async createUser(req, res) {

    // Validation with Joi before it gets to the database
    const { value, error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const validateEmail = await User.find({ email: req.body.email });
    if (validateEmail.length > 0)
      throw new BadUserRequestError("An account with this email already exists");
    // const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

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
}

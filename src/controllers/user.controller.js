import bcrypt from "bcrypt";
import { BadUserRequestError } from "../error/error.js";
import User from "../model/user.model.js";
import {
  createUserValidator,
  loginUserValidator,
} from "../validators/user.validator.js";
import { config } from "../config/index.js";
import { newToken } from "../utils/jwtHandler.js";
import dotenv from "dotenv";
dotenv.config();

export default class UserController {

 
  static async createUser(req, res) {
    // Validation with Joi before it gets to the database
    const { value, error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const validateEmail = await User.find({ email: req.body.email });
    if (validateEmail.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
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

    // This is to exclude the password property returning in the response object
    const { _id, createdAt, updatedAt } = user;

    // Return a response to the client
    res.status(200).json({
      message: "Account created successfully",
      status: "Success",
      data: {
        name: req.body.name,
        email: req.body.email,
        id: _id,
        createdAt: createdAt,
        updatedAt: updatedAt,
      },
    });
  }

  static async Login(req, res) {
    // Catching all the errors and handling them as they are returned in the response body
    const { value, error } = loginUserValidator.validate(req.body);
    if (error) throw error;

    const user = await User.findOne({ email: req.body.email });
    if (!req.body?.email && !req.body?.password)
      throw new BadUserRequestError(
        "Please input your valid email address before you log in."
      );
    if (!user)
      throw new BadUserRequestError(
        "Please provide a valid email address and password before you can login."
      );

    const PasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!PasswordMatch)
      throw new BadUserRequestError(
        "Please provide a valid email address and password before you can login."
      );

    // This is to exclude the password property returning in the response object
    const { _id, createdAt, updatedAt } = user;

    // Returning a response to the client
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        name: req.body.name,
        email: req.body.email,
        id: _id,
        createdAt: createdAt,
        updatedAt: updatedAt,
        access_token: newToken(user),
      },
    });
  }
  static async protectedRoute(req, res) {
    // Route logic for authenticated users only
    res.status(200).json({
      message: "Protected route accessed successfully",
      status: "Success",
    });
  }
}

import dotenv from "dotenv";
dotenv.config();
import { User, validate } from "../models/user.model.js";
import bcrypt from "bcrypt";

export default class UserController {
  /**
   * Create a new user
   * @route POST/users
   * @param {Object} req - The request Object
   * @param {Object} res - The response Object
   * @returns {Object} The response object
   */
  static async newUser(req, res) {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      // Hash the password
      // const hashedPassword = bcrypt.hashSync(
      //   req.body.password,
      //   +process.env.BCRYPT_SALT_ROUND
      // );
      // Create a new user object in database
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.status(201).json({
        status: "Success",
        message: "User created",
        data: {
          user,
        },
      });
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  }
  /**
   * Get all users
   * @route GET users
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async allUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        data: {
          users,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

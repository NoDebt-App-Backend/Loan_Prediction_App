import User from "../model/user.model.js";
import { Token } from "../model/token.model.js";
import crypto from "crypto";
import Joi from "joi";
import sendEmail from "../utils/sendEmail.js";
import { config } from "../config/index.js";
import { resetPasswordValidator } from "../validators/resetPasswordValidator.js";
import {
  BadUserRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../error/error.js";

/**
 * Controller class for managing password-related operations.
 */
export default class PasswordController {
  /**
   * Handles the change password request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async changePassword(req, res) {
    const { email } = req.query;
    // const passwordSchema = Joi.object({
    //   email: Joi.string().email().required(),
    // }).messages({
    //   "any.required": "Email is required",
    //   "string.email": "Invalid email format",
    // });
    const { error } = resetPasswordValidator.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      throw error;
    }
    // Find the user by email
    const user = await User.findOne({ email: email });

    if (!user) throw new NotFoundError("User with given email does not exist");

    // Generate or retrieve the password reset token
    let token = await Token.findOne({ userId: user._id });
    const fiveDigitToken = crypto.randomInt(10000, 99999).toString();

    if (token)
      throw new BadUserRequestError(
        "A password reset request has already been made, Try again in 1 hour"
      );

    if (!token) {
      token = await Token.create({
        userId: user._id,
        fiveDigitToken: fiveDigitToken,
      });
    }
    // Generate the password reset link
    const link = `${config.base_url}/password-reset/${user._id}`;

    await sendEmail(
      email,
      "Password Reset Request",
      {
        name: user.name,
        token: fiveDigitToken,
        link: link,
      },
      "./template/resetPassword.handlebars"
    );
    res.status(200).send("password reset link sent to your email account");
  }

  /**
   * Handles the validate token request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async sendToken(req, res) {
    const id = req.params.id;
    // const schema = Joi.object({
    //   fiveDigitToken: Joi.number().required(),
    // });
    const { error } = resetPasswordValidator.validate(req.body);

    if (error) throw error;
    // Find the user by email
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("invalid link or expired");

    // Find the token
    const token = await Token.findOne({
      userId: user._id,
      fiveDigitToken: req.body.fiveDigitToken,
    });
    if (token) {
      res.status(200).send("Token Validated");
    }

    if (!token) throw new UnAuthorizedError("Invalid token link or expired");

    if (req.body.fiveDigitToken !== token.fiveDigitToken)
      throw new UnAuthorizedError("Invalid token link or expired");
  }

  /**
   * Handles the password reset request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async updateNewPassword(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("invalid link or expired");
    if (!req.body.password)
      throw new BadUserRequestError("Password field cannot be empty");
    let token = await Token.findOne({ userId: user._id });

    const updatePasswordSecretKey = config.password_secretkey;

    if (!req.body.secret_key)
      throw new BadUserRequestError("Invalid Password change request");
    const { error } = resetPasswordValidator.validate(req.body);
    if (error) throw error;
    if (req.body.secret_key == updatePasswordSecretKey) {
      user.password = req.body.password;
      user.confirmPassword = req.body.confirmPassword;
      await user.save();
      await token.deleteOne();
      await sendEmail(
        user.email,
        "Password Change Successful",
        {
          name: user.name,
        },
        "./template/passwordUpdated.handlebars"
      );

      return res.status(200).send({
        status: "Success",
        message: "Your password has been changed",
      });
    }
    if (req.body.secret_key !== updatePasswordSecretKey)
      throw new UnAuthorizedError("Invalid Password change request");
  }
}

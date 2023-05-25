import User from "../model/user.model.js";
import { Token } from "../model/token.model.js";
import crypto from "crypto";
import Joi from "joi";
import sendEmail from "../utils/sendEmail.js";

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
    try {
      const { email } = req.query;
      const passwordSchema = Joi.object({
        email: Joi.string().email().required(),
      }).messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
      });
      const { error } = passwordSchema.validate(req.query, {
        abortEarly: false,
      });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
      // Find the user by email
      const user = await User.findOne({ email: email });

      if (!user)
        return res.status(400).send("User with given email does not exist");
      // Generate or retrieve the password reset token
      let token = await Token.findOne({ userId: user._id });
      const fiveDigitToken = crypto.randomInt(10000, 99999).toString();

      if (token)
        return res
          .status(400)
          .send(
            "A password reset request has already been made, Try again in 1 hour"
          );

      if (!token) {
        token = await Token.create({
          userId: user._id,
          fiveDigitToken: fiveDigitToken,
        });
      }
      // Generate the password reset link
      const link = `${process.env.BASE_URL}/password-reset/${user._id}`;

      sendEmail(
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
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occured with sending mail, try again.");
    }
  }

  /**
   * Handles the validate token request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async sendToken(req, res) {
    try {
      const id = req.params.id;
      const schema = Joi.object({
        fiveDigitToken: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);

      if (error) return res.status(400).send(error.details[0].message);
      // Find the user by email
      const user = await User.findById(id);
      console.log(user);
      if (!user) return res.status(400).send("invalid link or expired");

      // Find the token
      const token = await Token.findOne({
        userId: user._id,
        fiveDigitToken: req.body.fiveDigitToken,
      });
      console.log(token);

      if (!token) return res.status(400).send("invalid token link or expired");

      if (req.body.fiveDigitToken !== token.fiveDigitToken)
        return res.status(400).send("invalid token link or expired");

      res.send("Token Validated");
      await token.deleteOne();
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occured");
    }
  }

  /**
   * Handles the password reset request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async updateNewPassword(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) return res.status(400).send("invalid link or expired");
      if (!req.body.password)
        return res.status(400).send("Password field cannot be empty");

      const updatePasswordSecretKey = process.env.UPDATE_PASSWORD_SECRET_KEY;

      if (!req.body.secret_key)
        return res.status(400).send("Invalid Password change request");
      if (req.body.secret_key == updatePasswordSecretKey) {
        user.password = req.body.password;
        await user.save();
        sendEmail(
          user.email,
          "Password Change Succesful",
          {
            name: user.name,
          },
          "./template/passwordUpdated.handlebars"
        );

        return res.status(200).send("Your password has been changed");
      }
      if (req.body.secret_key !== updatePasswordSecretKey) {
        return res.status(400).send("Invalid Password change request");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

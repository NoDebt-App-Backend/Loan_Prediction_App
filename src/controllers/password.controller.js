import { User } from "./../models/user.model.js";
import { Token } from "./../models/token.js";
import crypto from "crypto";
import Joi from "joi";
import sendEmail from "./../utils/sendEmail.js";
import bcrypt from "bcrypt";

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
      const passwordSchema = Joi.object({
        email: Joi.string().email().required(),
      }).messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
      });
      const { error } = passwordSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });

      if (!user)
        return res.status(400).send("User with given email does not exist");
      // Generate or retrieve the password reset token
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await Token.create({
          userId: user._id,
          linkToken: crypto.randomBytes(32).toString("hex"),
          fiveDigitToken: crypto.randomInt(10000, 99999).toString(),
        });
      }
      // Generate the password reset link
      const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.linkToken}`;
      // Compose the email text
      const text = `Hello ${user.name} \nYour token to reset your password is ${token.fiveDigitToken}\nThis token expires in an hour, follow the link below to input new password \n${link}`;
      // Send the email
      await sendEmail(req.body.email, "Password reset", text);
      res.send("password reset link sent to your email account");
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
  static async sendPassword(req, res) {
    try {
      // Validate the request body
      const schema = Joi.object({
        fiveDigitToken: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);

      if (error) return res.status(400).send(error.details[0].message);
      // Find the user by ID
      const user = await User.findById(req.params.userId);

      if (!user) return res.status(400).send("invalid link or expired");
      // Find the token
      const token = await Token.findOne({
        userId: user._id,
        linkToken: req.params.token,
        fiveDigitToken: req.body.fiveDigitToken,
      });

      if (!token) return res.status(400).send("invalid token link or expired");
      // Hash the new password
      // const hashedPassword = await bcrypt.hash(
      //   req.body.password,
      //   +process.env.BCRYPT_SALT_ROUND
      // );
      user.password = req.body.password;

      await user.save();
      await token.deleteOne();

      res.send("password reset successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occured");
    }
  }
}

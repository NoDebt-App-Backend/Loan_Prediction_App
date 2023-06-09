import Admin from "../model/admin.model.js";
import { Token } from "../model/token.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
// import Joi from "joi";
import sendEmail from "../utils/sendEmail.js";
import { config } from "../config/index.js";
import {
  emailValidator,
  tokenValidator,
  resetPasswordValidator,
} from "../validators/resetPasswordValidator.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";
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

    const { error } = emailValidator.validate(req.query, {
      abortEarly: false,
    });

    if (error) {
      throw error;
    }
    // Find the admin by email
    const admin = await Admin.findOne({ email: email });

    if (!admin)
      throw new NotFoundError("Admin with given email does not exist");

    // Generate or retrieve the password reset token
    let token = await Token.findOne({ adminId: admin._id });
    const fiveDigitToken = crypto.randomInt(10000, 99999).toString();
    const passwordLink = admin.passwordLink;

    if (token) token = undefined;

    if (!token) {
      token = await Token.create({
        adminId: admin._id,
        fiveDigitToken: fiveDigitToken,
        passwordLink: admin.passwordLink,
      });
    }
    // Generate the password reset link
    const link = `${passwordLink}/${admin._id}`;

    await sendEmail(
      email,
      "Password Reset Request",
      {
        name: admin.firstName,
        token: fiveDigitToken,
        link: link,
      },
      "./template/resetPassword.handlebars"
    );
    res.status(200).send("Password reset link sent to your email account");
  }

      /**
   * Handles the validate token request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async sendToken(req, res) {
    const id = req.params.id;

    const { error } = tokenValidator.validate(req.body);

    if (error) throw error;
    // Find the admin by email
    const admin = await Admin.findById(id);
    if (!admin) throw new NotFoundError("invalid link or expired");

    // Find the token
    const token = await Token.findOne({
      adminId: admin._id,
      fiveDigitToken: req.body.fiveDigitToken,
    });
    if (token) {
      res.status(200).send("Token Validated");
    }

    // if (!token) throw new UnAuthorizedError("Invalid token link or expired");

    if (req.body.fiveDigitToken !== token.fiveDigitToken)
      throw new UnAuthorizedError("Invalid token link or expired");
  }

  static async resendToken(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Admin not found")

    const admin = await Admin.findById(id);

    let token = await Token.findById(id);
    const fiveDigitToken = crypto.randomInt(10000, 99999).toString();
    const passwordLink = admin.passwordLink;

    if (token) token = undefined;

    if (!token) {
      token = await Token.create({
        adminId: admin._id,
        fiveDigitToken: fiveDigitToken,
        passwordLink: admin.passwordLink,
      });
    }
    // Generate the password reset link
    const link = `${passwordLink}/${admin._id}`;

    await sendEmail(
      admin.email,
      "Password Reset Request",
      {
        name: admin.firstName,
        token: fiveDigitToken,
        link: link,
      },
      "./template/resetPassword.handlebars"
    );
    res.status(200).send("Password reset link sent to your email account");
  }

  /**
   * Handles the password reset request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async updateNewPassword(req, res) {
    const id = req.params.id;
    const admin = await Admin.findById(id);
    if (!admin) throw new NotFoundError("invalid link or expired");
    if (!req.body.password)
      throw new BadUserRequestError("Password field cannot be empty");
    let token = await Token.findOne({ adminId: admin._id });

    const updatePasswordSecretKey = config.password_secretkey;

    if (!req.body.secret_key)
      throw new BadUserRequestError("Invalid Password change request");
    if (req.body.secret_key == updatePasswordSecretKey) {
      const { error } = resetPasswordValidator.validate(req.body);
      if (error) throw error;

      const saltRounds = config.bcrypt_saltRound;
      const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

      admin.password = hashedPassword;
      admin.confirmPassword = hashedPassword;
      await admin.save();
      await token.deleteOne();
      await sendEmail(
        admin.email,
        "Password Change Successful",
        {
          name: admin.name,
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

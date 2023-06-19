import Contact from "../model/contact.model.js";
import { config } from "../config/index.js";
import { InternalServerError } from "../error/error.js";
import {contactValidator} from "../validators/contact.validator.js";
import nodemailer from "nodemailer";

export default class ContactController {
  /**
   * Handles the contact us request.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */

  static async contactUs(req, res) {
    const { error } = contactValidator.validate(req.body);
    if (error) {
      throw error;
    }
    try {
      // Create a new contact
      const contact = new Contact({
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        message: req.body.message,
        loginURL: req.body.loginURL,
      });

      // Save contact to the Contact collection
      await contact.save();

      const transporter = nodemailer.createTransport({
        host: config.nodemailer_host,
        port: 465,
        secure: true,
        auth: {
          user: config.nodemailer_user, //  Gmail email address
          pass: config.nodemailer_pass, //  Gmail password or an application-specific password
        },
      });

      const mailOptions = {
        from: "nodebtapplication@gmail.com",
        to: contact.contactEmail,
        subject: "Thank you for Reaching Out!",
        text: `Hello ${contact.contactName},\n\nThank you for Reaching out to us at Omega NoDebt!\n\nYour message has been received and is being responded to. You would receive a follow up mail shortly regarding your request.\nYou are important to us and we appreciate you. \n\nPlease use the following link to access the login page: ${contact.loginURL} or navigate to the signup page to create an account with us\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nNoDebt.`,
      };

      await transporter.sendMail(mailOptions);

      const { _id, createdAt, contactName, contactEmail, message } = contact;

      res.status(200).json({
        message: "Email has been sent successfully to contact",
        status: "Success",
        data: {
          contactId: _id,
          contactName: contactName,
          contactEmail: contactEmail,
          message: message,
          createdAt: createdAt,
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerError(error);
    }

    // Return a response to the client
    // res.status(200).json({
    //   message: "Company account created successfully",
    //   status: "Success",
    //   data: {
    //     company_profile: {
    //       company: req.body.organisationName,
    //       company_id: company._id,
    //     },
    //     admin: {
    //       firstName: req.body.firstName,
    //       lastName: req.body.lastName,
    //       email: req.body.email,
    //       AdminId: _id,
    //       createdAt: createdAt,
    //       updatedAt: updatedAt,
    //       passwordLink: passwordLink,
    //       imageUrl: imageUrl,
    //     },
    //   },
    // });
  }
}

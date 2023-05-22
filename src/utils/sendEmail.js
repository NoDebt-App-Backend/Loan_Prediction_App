import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
/**
 * Send an email
 * @param {String} email - The recipient email.
 * @param {String} subject - The email subject.
 * @param {String} text - The email body text.
 * @returns {void}
 */
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: false,
      debug: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      from: process.env.USER,
    });

    transporter.sendMail(
      {
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      },
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      }
    );
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export default sendEmail;

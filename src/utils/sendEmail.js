import dotenv from "dotenv";
dotenv.config();


import  nodemailer from "nodemailer";
import  handlebars from "handlebars";
import  path from "path";
import fs from 'fs'


import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
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

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.USER,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error) ;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error) ;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/
export default sendEmail;
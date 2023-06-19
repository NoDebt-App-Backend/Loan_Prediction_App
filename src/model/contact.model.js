import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  loginURL: {
    type: String
  }
}, {timestamps: true});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
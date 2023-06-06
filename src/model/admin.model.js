import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: false,
  },

  phoneNumber: { 
     type: String,
     unique: true, 
     sparse: true 
    },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    required: false,
  },
  
  password: {
    type: String,
    required: true,
  },
  
}
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

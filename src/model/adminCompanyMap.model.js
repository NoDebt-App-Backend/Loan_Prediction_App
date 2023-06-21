
import mongoose from "mongoose";

const adminCompanyMapSchema = new mongoose.Schema({
    adminFirstName: {
    type: String,
    required: true,
  },
  adminLastName:{
      type:String,
      required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: false,
  },
  adminGoogleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminGoogle",
    required: false,
  },
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },

  organisationName:{
    type:String,
    required: true,
},
});

const AdminCompanyMap = mongoose.model("AdminCompanyMap", adminCompanyMapSchema);

export default AdminCompanyMap;

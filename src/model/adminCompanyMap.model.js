
import mongoose from "mongoose";

const adminCompanyMapSchema = new mongoose.Schema({
    adminFirstName: {
    type: String,
    required: true,
  },
  adminLastName:{
      type:String,
      required: false,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
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
  // OrganisationName:{
  //   type:String,
  //   required:false,
  // }
});

const AdminCompanyMap = mongoose.model("AdminCompanyMap", adminCompanyMapSchema);

export default AdminCompanyMap;

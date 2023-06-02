
import mongoose from "mongoose";

const adminCompanyMapSchema = new mongoose.Schema({
    adminFisrtName: {
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
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  companyName:{
    type:String,
    required:false,
  }
});

const AdminCompanyMap = mongoose.model("AdminCompanyMap", adminCompanyMapSchema);

export default AdminCompanyMap;

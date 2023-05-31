import mongoose from "mongoose";

const adminCompanyMapSchema = new mongoose.Schema({
    adminName: {
    type: String,
    required: true,
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
    required:true,
  }
});

const AdminCompanyMap = mongoose.model("AdminCompanyMap", adminCompanyMapSchema);

export default AdminCompanyMap;

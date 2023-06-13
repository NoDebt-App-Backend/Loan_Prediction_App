import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
    unique: false,
  },
});

const Organisation = mongoose.model("Organisation", OrganisationSchema);

export default Organisation;

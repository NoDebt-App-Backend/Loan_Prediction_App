import mongoose from "mongoose";

const OrganisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
  },
});

const Organisation = mongoose.model("Organisation", OrganisationSchema);

export default Organisation;

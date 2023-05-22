import mongoose from "mongoose";
// Database connection function

const connection = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.DATABASE, connectionParams);
    console.log("connected to database.");
  } catch (error) {
    console.log(error, "could not connect database");
  }
};

export default connection;

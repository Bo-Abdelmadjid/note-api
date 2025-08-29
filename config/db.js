import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Connection to DB failed: ", error.message);
    process.exit(1);
  }
};

export default connectDB;

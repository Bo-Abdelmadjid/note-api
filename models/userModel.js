import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userModel);

export default User;

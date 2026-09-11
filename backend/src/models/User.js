import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    MobileNo: {
      type: String,
    },
    location: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    onBoarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

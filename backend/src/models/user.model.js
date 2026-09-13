import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
    },
    location: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    profilePic: {
      public_url: {
        type: String,
        default: "",
      },
      secure_url: {
        type: String,
        default: "",
      },
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
    role: {
      type: String,
      enum: ["user", "business", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

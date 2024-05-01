import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "Please Provide a userName"] },
  email: {
    type: String,
    required: [true, "Please Provide a email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please Provide password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;

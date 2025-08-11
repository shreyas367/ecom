// src/models/User.ts
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Email verification fields
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;

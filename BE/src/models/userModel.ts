import mongoose, { Document } from "mongoose";

export type roles = "patient" | "doctor" | "admin";
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: roles;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["patient", "doctor", "admin"] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);

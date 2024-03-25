import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const User = mongoose.model("Users", UserSchema);

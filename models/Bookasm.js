import mongoose from "mongoose";

const pschema = mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    author: String,
    category: Number,
  },
  {
    timestamps: true,
  }
);
export const Books = mongoose.model("posts", pschema);

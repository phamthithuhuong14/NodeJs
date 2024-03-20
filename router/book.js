import express from "express";
import { Books } from "../models/book.js";
import { CheckBookValidate } from "../middleware/book.js";

const routerBook = express.Router();
routerBook.post("/books", async (req, res) => {
  const body = req.body;
  const book = new Book(body);
  const response = await book.save();
  res.send(response);
});
routerBook.get("/books", async (req, res) => {
  const response = await Books.find();
  res.send(response);
});
routerBook.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const book = routerBook(id);
  res.send(book);
});
routerBook.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await Books.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});
routerBook.delete("/books/:id", async (req, res) => {
  const id = req.params.id;

  const response = await Books.findOneAndDelete({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});
export default routerBook;

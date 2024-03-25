import Express from "express";
import { Books } from "../models/Bookasm.js";
import { CheckPostValidate } from "../middleware/bookasm.js";

const routerBookasm = Express.Router();
routerBookasm.post("/posts", CheckPostValidate, async (req, res) => {
  const body = req.body;
  const book = new Books(body);
  const response = await book.save();
  res.send(response);
});
routerBookasm.get("/posts", async (req, res) => {
  const response = await Books.find();
  res.send(response);
});
routerBookasm.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await Books.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});
routerBookasm.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await Books.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});

routerBookasm.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const response = await Books.findOneAndDelete({ _id: id });
  res.send(response);
});
export default routerBookasm;

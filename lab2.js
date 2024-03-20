import express from "express";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./scratch");
const express = require("express");
const app = express();
const port = 4000;

const data = [
  {
    id: 1,
    title: "An apple mobile which is nothing like apple",
    duration: "12:05",
    thumbnail: "https://cdn.dummyjson.com/products-images/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "Samsung Universe 9",
    duration: "10:25",
    thumbnail: "https://cdn.dummyjson.com/products-images/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Galaxy Book",
    duration: "06:51",
    thumbnail: "https://cdn.dummyjson.com/products-images/3/thumbnail.jpg",
  },
];

const VideoList = () => {
  let video = [];
  const item = localStorage.getItem("video");
  if (item !== null) {
    video = JSON.parse(item);
    return video;
  }
};

const VideoByid = (id) => {
  const video = VideoList();
  const product = video.filter((video) => {
    return video.id == id;
  });
  return product;
};

const DeleteProduct = (id, data) => {
  const video = VideoList();
  let keyvalue = -1;
  for (let i = 0; i < video.length; i++) {
    if (video[i].id == id) {
      keyvalue = i;
      break;
    }
  }
};

const UpdateProduct = (id, data) => {
  const video = VideoList();
  let keyvalue = -1;
  for (let i = 0; i < video.length; i++) {
    if (video[i].id == id) {
      keyvalue = i;
      break;
    }
  }
};

app.get("/video", (req, res) => {
  res.send(VideoList());
});
app.get("/video/:id", (req, res) => {
  const id = req.params.id;
  const product = VideoByid(id);
  res.send(product);
});
app.delete("/video/:id", (req, res) => {
  const id = req.params.id;
  const status = DeleteProduct(id, data);
  res.send(status);
});
app.post("/video", (req, res) => {
  const body = req.body;
  console.log(body);
  res.send({ body });
});
app.put("/video/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const status = UpdateProduct(id, body);
  res.send(status);
});
app.use(express.json());
app.listen(port, () => {
  console.log(`Endpoint http://Localhost:${port}/video`);
});

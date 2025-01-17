// const express = require('express');
import express from "express";

import router from "./router/products.js";
import connectdb from "./database/connect.js";

// import Authrouter from "./router/auth.js";
import routerBook from "./router/book.js";
import routerBookasm from "./router/Bookasm.js";
import Authrouter from "./router/authasm.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", router);

app.use("/api", Authrouter);
app.use("/api", routerBook);
app.use("/api", routerBookasm);
app.listen(port, async () => {
  await connectdb();
  console.log(`Endpoint http://localhost:${port}/api/products`);
});

//buoi2
//const express = require('express')
import express from "express";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./scratch");
const productsList = () => {
  let products = [];
  const items = localStorage.getItem("products");
  if (items !== null) {
    products = JSON.parse(items);
  }
  return products;
};
const addProducts = (data) => {
  const products = productsList();
  products.push(data);
  localStorage.setItem("products", JSON.stringify(products));
  return { status: true, message: "Add product success" };
};
const ProductsById = (id) => {
  const products = productsList();
  const product = products.filter((products) => {
    return products.id == id;
  });
  return product;
};
const UpdateProduct = (id, data) => {
  const products = productsList();
  let keyvalue = -1;
  for (let i = 0; i < products.length; i++) {
    keyvalue = i;
    break;
  }
  if (keyvalue > -1) {
    products[keyvalue].title = data.title;
    products[keyvalue].price = data.price;
    localStorage.setItem("products", JSON.stringify(products));
    return {
      status: true,
      data: products[keyvalue],
      mess: "Update successfull",
    };
  } else {
    return {
      status: false,
      data: products[keyvalue],
      mess: "Product Not Found",
    };
  }
};
const DeleteProduct = (id) => {
  const products = productsList();
  let keyvalue = -1;
  for (let i = 0; i < products.length; i++) {
    keyvalue = i;
    break;
  }
  if (keyvalue > -1) {
    products.splice(keyvalue, 1);
    localStorage.setItem("products", JSON.stringify(products));
    return {
      status: true,
      data: products[keyvalue],
      mess: "Update successfull",
    };
  } else {
    return {
      status: false,
      data: products[keyvalue],
      mess: "Product Not Found",
    };
  }
};

const app = express();
const port = 2000;
app.use(express.json());
//Tao API giong json-server
app.get("/products", (req, res) => {
  res.send(productsList());
});
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = productsList(id);
  res.send(product);
});
// app.post("/products", (req, res) => {
//   const body = req.body;
//   const mess = addProducts(body);
//   res.send(mess);
// });
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const status = UpdateProduct(id, data);
  res.send(status);
  // res.send(ProductsList());
});
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const status = DeleteProduct(id, data);
  res.send(status);
  // res.send(ProductsList());
});
app.post(
  "/products",
  (req, res, next) => {
    const body = req.body;
    console.log(body.pass);
    if (body.pass == "123456") {
      next();
    } else {
      res.send({ status: false, message: "you can not access this" });
    }
  },
  (req, res) => {
    res.send({ status: true, message: "you can access this" });
  }
);
// app.post("/products", (req, res) => {
//   const body = req.body;
//   console.log(body);
//   products.push(body);
//   localStorage.setItem("products", JSON.stringify(products));
//   res.send(body);
// });

//buoi1
// const express = require('express')
// const app = express()
// const port = 3000
// const products = [
//     {
//         id:1,
//         name: "san pham 1",
//         price:1000
//     },
//     {
//         id:2,
//         name: "san pham 2",
//         price:2000
//     },
//     {
//         id:3,
//         name: "san pham 3",
//         price:3000
//     }
// ]

// app.get('/products', (request,response)=>{
//     //nhan thong tin tu nguoi dung
//     id = request.query.id

//     const product = products.filter((data) =>{
//         return data.id == id
//     })
//     response.send(product)
// })
// app.listen(port,()=>{
//     console.log(`listen on port ${port}`);
// })

// const appp = express()
// const port = 4000;
// app.get("/:slug1/:slug2", (req, res) => {
//   //slug: laays id
//   const slug1 = req.params.slug1;
//   const slug2 = req.params.slug2;
//   res.send({ slug1, slug2 });

// //Query laays keyword
// const keyword = req.query.keyword
// const cate_id = req.query.category
// console.log(keyword);
// res.send({keyword,cate_id})
// });

// app.use(express.json()); //lay id
// app.post("/posts", (req, res) => {
//   //slug: laays id
//   const body = req.body;
//   console.log(body);
//   res.send({ body });

// //Query laays keyword
// const keyword = req.query.keyword
// const cate_id = req.query.category
// console.log(keyword);
// res.send({keyword,cate_id})
// });

//

app.listen(port, () => {
  console.log(`Endpoint http://localhost:${port}/products`);
});

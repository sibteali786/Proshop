import express from "express"
import products from "./data/products.js"
import dotenv from "dotenv"
// MongoDB configuration 
import connectDB from "./config/db.js"
import colors from 'colors';
dotenv.config(); // allows to use some variables defined accross whole app


// Connecting DB
connectDB();
const app = express();
app.get("/", (req, res) => {
  res.send("Api is Running......");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server made in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold)
);

// its a best practice to keep .env local and never send it to github as it contains token secret, API keys etc 

// Using Ecma script way of importing packages using import rather than require syntax 
// it has two ways wither use .mjsimport connectDB from './config/db';

// OR 
// Add type : "module" in package.json of the root folder  
import express from "express";
// import products from "./data/products.js"  no need when database is connected and configured
import dotenv from "dotenv";
// MongoDB configuration
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import colors from "colors";
dotenv.config(); // allows to use some variables defined accross whole app

// Connecting DB
connectDB();
const app = express();
app.use(express.json()); // allows us to accept json data in the body

//using productRoutes and userRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/products", (req, res) => {
  res.json(products);
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running......");
  });
}
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server made in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// its a best practice to keep .env local and never send it to github as it contains token secret, API keys etc

// Using Ecma script way of importing packages using import rather than require syntax
// it has two ways wither use .mjsimport connectDB from './config/db';

// OR
// Add type : "module" in package.json of the root folder

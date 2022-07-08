import express from 'express';
const router = express.Router();
import Product from './../models/productModel.js';
import asyncHandler from 'express-async-handler';
// async routes have promises returned by the schema in the database 

// @desc    Fetch all the products 
// @route   GET /api/products
// @access  Public
router.get("/", 
asyncHandler(async (req, res) => {
    const products = await Product.find({}) // gets all the products
    res.json(products);
  }));


// @desc    Fetch single products 
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product Not found")
    }
  }));

export default router
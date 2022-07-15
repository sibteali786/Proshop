import Product from './../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all the products 
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({}) // gets all the products
    res.json(products);
})


const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product Not found")
    }
}) 

export {
    getProducts,
    getProductById
}
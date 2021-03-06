import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';
const router = express.Router();
// async routes have promises returned by the schema in the database 

// @desc    Fetch all the products 
// @route   GET /api/products
// @access  Public
router.route("/").get(getProducts);
router.route("/:id").get(getProductById); 

export default router
import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
// async routes have promises returned by the schema in the database 

// @desc    Fetch all the products 
// @route   GET /api/products
// @access  Public
router.route('/').post(registerUser);
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)

export default router
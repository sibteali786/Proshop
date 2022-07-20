import asyncHandler from "express-async-handler";
import User from "./../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc    Auth user and get token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // we can use below line to access json data we send from the form or postman (initially)
  const { email, password } = req.body;
  // res.send({email,password});     // checking if we are actually getting back same result what we are sending
  const user = await User.findOne({ email });

  // is user exists then we have to match email and pass ( which is plain while the one in db is encrypted )
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token:null  // not defined till now
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register a new User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // we can use below line to access json data we send from the form or postman (initially)
  const { name, email, password } = req.body;
  // res.send({email,password});     // checking if we are actually getting back same result what we are sending
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }); // something has been created
  } else {
    res.status(404);
    throw new Error("Invalid User Data");
  }
});

// @desc    GET user profile
// @route   POST /api/user/login
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or Password");
  }

  // res.send("Success");
});

export { authUser, registerUser, getUserProfile };

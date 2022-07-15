import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req,res,next) => {
    // console.log(req.headers.authorization);  // to check our authorization header
    let token
    if(req.headers.authorization  && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) { 
            console.error(error);
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }

    if (!token){
        res.status(401);
        throw new Error('Not Authorized, no token')
    } 
    
})

export {protect}
import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    rating:{
        type:Number,
        requried:true
    },
    comment:{
        type:String,
        requried:true
    },
},{
    timestamps:true
}) 
// Declare the Schema of the Mongo model
const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, // for objectId type
        required:true,
        ref:"User"  // refrencing User model or relation between user and product
    },
    name:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    reviews:[reviewSchema],     // an array of different objects of Reviews
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
},{
    timestamps:true
});

//Export the model
const Product = mongoose.model('Product', productSchema);
export default Product
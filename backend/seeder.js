import  mongoose from 'mongoose';
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js';
import products from './data/products.js';
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from './config/db.js';

dotenv.config();
connectDB();
// since dealing with mongoDB directly thus using async as returns promise 
const importData = async () => {
    try {
        // deleting all the collections so as to avoid importing things which are already in db
        await Order.deleteMany();   // deletes everything
        await Product.deleteMany();
        await User.deleteMany();

        // inserting users into database and storing whats returned into a variable 
        const createdUsers = await User.insertMany(users);   // users we created locally

        // extracting admin user to add it to the product model
        const adminUser = createdUsers[0]._id;  // getting id only 

        const sampleProducts = products.map(product => {
            return {...product, user:adminUser} // spreading to get everything back along with user as Admin user
        })

        // Adding it to the dataBase 
        await Product.insertMany(sampleProducts)

        console.log("Data Imported".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);    // exit with failure
    }
}

    const destroyData = async () => {
        try {
            // deleting all the collections so as to avoid importing things which are already in db
            await Order.deleteMany();   // deletes everything
            await Product.deleteMany();
            await User.deleteMany();
        
            console.log("Data Destroyed".red.inverse);
            process.exit();
        } catch (error) {
            console.error(`${error}`.red.inverse);
            process.exit(1);    // exit with failure
        }
}


if (process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
} 
import mongoose from 'mongoose'; // Erase if already required
import bcrypt from 'bcryptjs';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true // to get date when is created
});

// defining custom methods for user model
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// encrypting passowrd entered by user before saving schema for it 
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    // do this only when password filed is given ( creation not updation)
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt);
})
//Export the model
const User = mongoose.model('User', userSchema);
export default User 
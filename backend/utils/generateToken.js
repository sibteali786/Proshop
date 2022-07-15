import jwt from 'jsonwebtoken';

const generateToken = (id)=>{   // the user id for which token has to be generated 
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export default generateToken;
import bcrypt from "bcryptjs"

const users = [
    {
        name:"Admin User",
        email:"admin@example.com",
        password:bcrypt.hashSync("123456",10),  // password will be generated using bcrypt library
        isAdmin:true
    },
    {
        name:"Sibteali Baqar",
        email:"sibteali@example.com",
        password:bcrypt.hashSync("123456",10),
    },
    {
        name:"Junaid Ali",
        email:"junaidali@example.com",
        password:bcrypt.hashSync("123456",10),
    },
]
export default users
// we are hasing synchronuously as we are not taking values from a form or something  
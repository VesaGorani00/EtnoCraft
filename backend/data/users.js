import bcrypt from "bcryptjs"

const users = [
    {
        name:"Admin User",
        email:"admin@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"Eron Blakaj",
        email:"roki@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin:false
    },
    {
        name:"Vesa Gorani",
        email:"vesa@email.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin:false
    },
];

export default users
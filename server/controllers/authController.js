
import Users from "../db/models/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res)=>{


    try{

    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, email, password} = req.body;

    console.log("req body :", req.body);


    if(!name || !email || !password){

        res.status(400).json({message : "all fields are required!"})
        return;
    }


    const findUser = await Users.findOne({email});

    if (findUser){
        res.status(400).json({message : "user already exist ... pls login to continue"})
        return;
    }


   
    else{
          
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await Users.create({name, email, password : hashedPassword })

        res.status(201).json({message : "user created successfully", data : {name, email}})
        return;

    }

}
catch(err){
    console.log("error :",err);

    res.status(400).json({message : err.message ? err.message : "something went wrong"});

}

   
}
export const signin = async (req,res)=>{
    try{ 

        // checking any data on request req.body
        if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // taking email and pswd fom req.body
    const {email,password}= req.body;

    console.log("req body :", req.body);
    

    // checking user is already exist in db
    const db_user = await Users.findOne({email})

    // console.log("dbuser :", db_user);

    if(db_user){

        const db_pswd = db_user.password;

        const isPasswordMatch = await  bcrypt.compare(password, db_pswd);

        if(!isPasswordMatch){
            res.status(400).send({message : "password doesn't match "})
            return;
        }

        const authToken = await jwt.sign({user_id : db_user._id}, process.env.SECRET_KEY, {expiresIn : "1d"} )

        res.cookie("token", authToken);

        res.status(200).send({message : "login success"});
        
    }
    else{
        res.status(400).send({message : "pls signup to continue!"})
    }

    
    }
    catch(err){
        console.log("error :",err);

    }
}


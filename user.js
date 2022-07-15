import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {  createUsers, getUserByName} from "./Function.js";
const router = express.Router();


async function generateHashedPassword(password){

    const No_of_rounds =10;
    const salt = await bcrypt.genSalt(No_of_rounds);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    console.log(salt,hashedPassword);
    return hashedPassword;
}

  
  router.post("/signup",  async function(request,response){
    const {username,password} = request.body;

    const userFromDB = await getUserByName(username);

  if(userFromDB){
      response.status(404).send({message:"user already exist"});
        }

  else if(password.length<8){
      response.send({message:"Password characSters should be maximum 8"})
  }
  else{
    
    const hashed  = await generateHashedPassword(password);
    const result = await createUsers({
        username:username,
        password:hashed
        })

    console.log("result",result);
    response.send(result);
  }

    })

  router.post("/login", async function(request, response){
    const{username,password} = request.body;

    const userFromDB = await getUserByName(username);

  if(!userFromDB){
    response.status(401).send({message:"Invalid credentials"});
  }
  else{
    const storedPassword = userFromDB.password;
    console.log(storedPassword);
    const isMatched = await bcrypt.compare(password, storedPassword);
   if(isMatched){
    const token = jwt.sign({id:userFromDB._id},process.env.secret_key);
    response.send({message : "Successful Login", token:token});
   }
   else{
    response.status(401).send({message:"Invalid credentials"});
   }
  }
  })
  
  
  export const usersRouter = router;



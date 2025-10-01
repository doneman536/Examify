import { addUserDB ,findUserDB } from '../services/handlingUsers.js';
import { validationResult } from 'express-validator';
import { verifyPassword } from '../utils/hashPassword.js';

export const registerUser = async (req , res, next)=>{
    // console.log("Request body:", req.body);
    const errors = validationResult(req);
    // console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { name , email , password } = req.body;
    try{
        const [result] = await addUserDB({ name , email , password });
        res.send({ id: result.insertId, name, email, "message": "Successfully created" });
    }
    catch(error){
        if(error.errno === 1062){res.status(500).send({'Error':"Email already exists"});}
    }
}

export const loginUser = async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(400).json({ errors: errors.array() });}
        const {email , password } = req.body;
        const user = await findUserDB(email);
        if(!user){return res.status(404).send({ error: "User not found" });}
        const isValid = await verifyPassword(password, user.password_hash);
        if(!isValid){return res.status(401).send({ error: "Incorrect password" });}
        res.send({'message':'Login Successful'});
    }
    catch(error){
        if(error){res.status(500).send({'error':error.message});}
    }
}
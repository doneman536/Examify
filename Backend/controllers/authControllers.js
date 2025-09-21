import { addUserDB } from '../services/handlingUsers.js';
import { validationResult } from 'express-validator';


export const registerUser = async (req , res, next)=>{
    console.log("Request body:", req.body);
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { name , email , password } = req.body;
    const [result] = await addUserDB({ name , email , password });
    console.log(result);
    res.send({ id: result.insertId, name, email, "message": "Successfully created" });
}
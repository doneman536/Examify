import pool from './utils/connectMySql.js'
import { hashFunction, hashComapre } from '../services/hashPassword.js';


export const registerUser = async (req , res, next)=>{
    const { name , email , password } = req.body;
    const hashedPassword =  await hashFunction(password);
    const [result] = await pool.query("INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)",[name ,email, hashedPassword]);
    return { id: result.insertId, name, email, "message": "Successfully created" };
}
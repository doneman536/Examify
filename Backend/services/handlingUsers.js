import pool from '../utils/connectMySql.js'
import { hashFunction, verifyPassword } from '../utils/hashPassword.js';


export const addUserDB = async(user)=>{
    const hashedPassword =  await hashFunction(user.password);
    return  await pool.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",[user.name ,user.email, hashedPassword]);
}

export const findUserDB = async(email)=>{
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0]; 
}
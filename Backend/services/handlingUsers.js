import pool from '../utils/connectMySql.js'
import { hashFunction, hashComapre } from '../utils/hashPassword.js';


export const addUserDB = async(user)=>{
    const hashedPassword =  await hashFunction(user.password);
    return  await pool.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",[user.name ,user.email, hashedPassword]);

}
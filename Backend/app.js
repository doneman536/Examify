import express, {urlencoded} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pool from './utils/connectMySql.js'

const app = express();
dotenv.config();

app.use(urlencoded({extended:true}));
app.use('/',);

mongoose.connect(process.env.MONOGOOSE_URI).then( async ()=>{
    console.log("Connected to MongoDB");
    const db = await pool;
    if(db){console.log("Connect to DB mysql");}
    else {console.log("Failed connect to DB mysql");}
    app.listen(process.env.BACKEND_PORT,async () =>{
        console.log(`Server started at http://localhost:${process.env.BACKEND_PORT}`);
    });
}).catch(err=>{
    console.log("Failed to connect MongoDB");
})
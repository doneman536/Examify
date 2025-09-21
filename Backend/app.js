import express, {urlencoded} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pool from './utils/connectMySql.js'
import authRoute from "./Routes/authoRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',authRoute);

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
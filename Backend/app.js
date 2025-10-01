import express, {urlencoded} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pool from './utils/connectMySql.js'
import authRoute from "./Routes/authoRoutes.js";
import session, { MemoryStore } from "express-session";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : true,
    store : MongoStore.create({mongoUrl:process.env.MONOGOOSE_URI,collectionName: "UserSessions"}),
    cookie: { maxAge: 1000 * 60 * 60 * 3 }
}))

// Routes
app.use('/',authRoute); // Sign up and Login of user
app.get('/dashboard',(req,res)=>{
    res.send(req.session);
})


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
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const sessionSchema = new mongoose.Schema({
    sessionId : {type : String, required : true, unique : true, default: uuidv4},
    userId : {type : Number, required : true },
    userType : {type : String , required : true},
    createdAt : {type : Date, default: Date.now, expires: '3d' }
});

export const sessionModel = mongoose.model('UserSessions',sessionSchema);
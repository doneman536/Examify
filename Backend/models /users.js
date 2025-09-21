import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName : {type : String , required : true, unique: true, trim: true},
    
});
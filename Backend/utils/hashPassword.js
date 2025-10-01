import bcrypt from "bcrypt";

export const hashFunction = async (password) =>{
    return await bcrypt.hash(password,12);
}

export const verifyPassword = async(password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}
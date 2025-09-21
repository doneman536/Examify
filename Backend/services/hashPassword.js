import bycypt from "bcrypt";

export const hashFunction = async (password) =>{
    return await bycypt.hash(password,12);
}

export const hashComapre = async(hashedPassword, password)=>{
    return await bycypt.compare(password, hashedPassword);
}
import { Router } from "express";
import { signUpValidator, loginUserValidator } from "../validators/validateSignUp.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const authRoute = Router();

authRoute.post('/register',signUpValidator , registerUser);
authRoute.post('/login',loginUserValidator,loginUser);


export default authRoute;


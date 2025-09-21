import { Router } from "express";
import { signUpValidator } from "../validators/validateSignUp.js";
import { registerUser } from "../controllers/authControllers.js";

const authRoute = Router();

authRoute.post('/register',signUpValidator , registerUser);


export default authRoute;


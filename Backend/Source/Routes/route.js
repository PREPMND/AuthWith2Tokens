import { Router } from "express";

//controller imports
import { loginUser, logoutUser, registerUser,getCurrentUser } from "../Controllers/auth.controller.js";
import { userLoginValidator } from "../Validators/login-body.validator.js";
import { userRegisterValidator } from "../Validators/register-body.validator.js";
import { verifyJWT } from "../Middlewares/verify-jwt.middleware.js";

export const authRouter=Router();
console.log("route registered")
authRouter.route("/login").post(userLoginValidator,loginUser);
authRouter.route("/register").post(userRegisterValidator,registerUser);
authRouter.route("/logout").post(verifyJWT,logoutUser);
authRouter.route("/currentuser").get(verifyJWT,getCurrentUser);
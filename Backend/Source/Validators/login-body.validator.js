import { AuthUser } from "../Models/user-auth.model.js";
import { apiError } from "../Utils/apiError.js";

export const userLoginValidator = (req, res, next) => {
    try {
        const { username, email, password} = req.body;
        if(password.trim()=="" || password== undefined){
            return next(new apiError(400,"Password is required"));
        }
        const hasUsername=username && typeof username==="string" && username.trim()!=="";
        const hasEmail=email && typeof email === "string" && email.trim() !== "";
        if(!hasEmail && !hasUsername){
            return next(new apiError(400,"Username/Email must be provided as a valid string"));
        }
        //did payload building and didnt create a seperate file
        req.validatedBody = {
            username:hasUsername?username.trim():undefined,
            email:hasEmail?email.trim():undefined,
            password,
        };
        next();
    } catch (error) {
        return next(new apiError(400, "Auth validation is not succesfull"));
    }
}
import { AuthUser } from "../Models/user-auth.model.js";
import { apiError } from "../Utils/apiError.js";

export const userLogoutService=async(query)=>{
    try {
        const {validatedUser}=query;
        if(!validatedUser){
            throw new apiError(500,"validatedUser was not found");
        }
        const user=req.validatedUser;
        const updatedUser=await AuthUser.findByIdAndUpdate(
            user._id,
            {$set:{refreshToken:undefined}},
            {new:true}
        ).select("refreshToken");
        if(!updatedUser){
            throw new apiError(400,"Something went wrong while logging user out");
        }
        if(updatedUser.refreshToken!==undefined){
            throw new apiError(401,"Logout process was declined by database");
        }
        return {
            message:
            "successfull"
        }
    } catch (error) {
        throw new apiError(401,`Server responded with : ${error.message}`);
    }
}
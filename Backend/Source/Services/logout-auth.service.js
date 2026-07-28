import { AuthUser } from "../Models/user-auth.model.js";
import { apiError } from "../Utils/apiError.js";

export const userLogoutService=async(req)=>{
    try {
        const validatedUser=req.validatedUser;
        if(!validatedUser){
            throw new apiError(500,"validatedUser was not found");
        }
        const user=validatedUser;
        const updatedUser=await AuthUser.findByIdAndUpdate(
            user._id,
            {$set:{refreshToken:""}},
            {new:true}
        ).select("refreshToken");
        if(!updatedUser || updatedUser.refreshToken!=''){
            throw new apiError(400,"Something went wrong while logging user out");
        }
        return {
            message:
            "successfull"
        }
    } catch (error) {
        throw error;
    }
}
import { AuthUser } from "../Models/user-auth.model.js";
import { apiError } from "../Utils/apiError.js";
import { apiResponse} from "../Utils/apiResponse.js";
import { generateAccessAndRefreshTokens } from "../Utils/generateTokens.js";

export const userLoginService = async (query) => {
    try {
        const { username, email, password } = query;
    
        const validPayloadCheck = [];
    
        if (username && username != undefined) validPayloadCheck.push({username});
        if (email && email != undefined) validPayloadCheck.push({email});
    
        if (validPayloadCheck.length == 0) {
            throw new apiError(400, "Username or email must be provided");
        }
    
        const userDetails = await AuthUser.findOne({ $or: validPayloadCheck });
        if (!userDetails) {
            throw new apiError(400, "No users were found , you must register first");
        }
    
        const isPasswordValid = await userDetails.isPasswordCorrect(password);
        
        if (!isPasswordValid) {
            console.log(throwing);
            
            throw new apiError(400, "Password is wrong");
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userDetails._id);
        const result = await AuthUser.findById(userDetails._id).select(
            "-refreshToken -password"
        );
        return {
            user:result,
            refreshToken,
            accessToken,
        }
    } catch (error) {
        throw new apiError(400,"Login request is declined by DB");
    }
    
}
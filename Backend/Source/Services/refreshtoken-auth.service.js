import jwt from "jsonwebtoken"
import { apiError } from "../Utils/apiError.js";
import { AuthUser } from "../Models/user-auth.model.js";
import { generateAccessAndRefreshTokens } from "../Utils/generateTokens.js";
export const refreshTokenService=async(req)=>{
    //handles both cookie validatio nand business logic
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
        throw new apiError(401, "Unauthorized Request");
    }
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECURITY
    );
    console.log("cookie:", incomingRefreshToken);

    const user = await AuthUser.findById(decodedToken?._id);
    console.log("user")

    if (!user) {
        throw new apiError(401, "Invalid RefreshToken");
    }


    if (incomingRefreshToken !== user.refreshToken) {
        throw new apiError(401, "Refresh token is expired or used");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return {refreshToken,accessToken}
}
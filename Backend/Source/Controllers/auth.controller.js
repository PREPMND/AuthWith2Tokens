import { userLoginService } from "../Services/login-auth.service.js";
import { userLogoutService } from "../Services/logout-auth.service.js";
import { refreshTokenService } from "../Services/refreshtoken-auth.service.js";
import { userRegisterService } from "../Services/register-auth.service.js";
import { apiError } from "../Utils/apiError.js";
import { apiResponse } from "../Utils/apiResponse.js";
import { cookieOptions } from "../Utils/cookieOptions.js";
export const loginUser = async (req, res,next) => {
    try {
        const { user, refreshToken, accessToken } =await userLoginService(req.validatedBody);
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new apiResponse(
                    200,
                    {
                        userDetails: user
                    },
                    "Login succesfull"
                )
            )
    } catch (error) {
        next(error)
    }
}

export const registerUser = async (req, res,next) => {
    try {
        const { createdUser } = await userRegisterService(req.validatedBody);
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    { createdUser }
                    , "Registration was successfull"
                )
            )
    } catch (error) {
        next(error)
    }
}
export const logoutUser = async (req, res) => {
    const { message } =await userLogoutService(req);
    if (message !== "successfull") {
        throw new apiError(400, "Logout was not succesfull")
    }
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);
    return res.status(200).json(new apiResponse(200,"User Logged Out Successfully"));
}

const refreshAccessToken = async (req, res) => {
    const {refreshToken,accessToken}=refreshTokenService(req)
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new apiResponse(200, {}, "access token refreshed"));
};

export const getCurrentUser = (req, res) => {
    return res.json({
        success: true,
        user: req.validatedUser,
    });
};
import { userLoginService } from "../Services/login-auth.service.js";
import { userLogoutService } from "../Services/logout-auth.service.js";
import { userRegisterService } from "../Services/register-auth.service.js";
import { apiError } from "../Utils/apiError.js";
import { apiResponse } from "../Utils/apiResponse.js";
export const loginUser = async (req, res,next) => {
    try {
        const { user, refreshToken, accessToken } =await userLoginService(req.validatedBody);

        const isProd = process.env.ENVIROMENT === "production";
        const options = {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
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
        console.log("enterd");
        
        const { createdUser } = await userRegisterService(req.validatedBody);
        console.log(createdUser);
        
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
    const { message } = userLogoutService(req.validatedUser);

    if (message !== "succesfull") {
        throw new apiError(400, "Logout was not succesfull")
    }

    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    };

    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    return res.status(200).json(new apiResponse(200,"User Logged Out Successfully"));
}
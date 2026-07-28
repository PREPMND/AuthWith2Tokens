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

const refreshAccessToken = async (req, res) => {

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
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", token, {
        httpOnly: true,                     // always true
        secure: isProd,                     // only true in production
        sameSite: isProd ? "none" : "lax",  // "none" for prod cross-domain, "lax" for localhost
    });
    ;
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, {}, "access token refreshed"));
};

export const getCurrentUser = (req, res) => {
    console.log("INSIDE");
    return res.json({
        success: true,
        user: req.validatedUser,
    });
};
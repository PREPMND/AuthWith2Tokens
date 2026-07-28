import { AuthUser } from "../models/user-auth.model.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
console.log("Token candidate:");
export const verifyJWT = async (req, res, next) => {

    const authHeader = req.header("Authorization");
    const token =
        req.cookies?.accessToken ||
        (authHeader ? authHeader.replace("Bearer ", "") : null);

    if (!token) {
        return next(new apiError(401, "Unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECURITY);
        const user = await AuthUser.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return next(new apiError(401, "Invalid Access Token"));
        }

        req.validatedUser = user;
        next();
    } catch (error) {
        return next(new apiError(401, error?.message || "Invalid token"));
    }
};
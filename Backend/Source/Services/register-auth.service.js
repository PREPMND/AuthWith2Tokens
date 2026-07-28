import { AuthUser } from "../Models/user-auth.model.js";
import { apiError } from "../Utils/apiError.js";

export const userRegisterService = async (query) => {
    try {
        if (!query) {
            throw new apiError(500, "internal server error , payload couldnt be processed");
        }
        const { username, email, password, fullName } = query;
        const ifUserExists = await AuthUser.findOne({ $or: [{ username }, { email }] });
        if (ifUserExists) {
            throw new apiError(401, "User with email or username already exists");
        }
        const user = await AuthUser.create({
            fullName,
            email,
            password,
            username,
        });
        if (!user || !user._id) {
            throw new apiError(500, "Something went wrong while creating new user");
        }
        const { password:_, refreshToken:__, ...safeUser } = user.toObject();
        return {createdUser:safeUser}
    } catch (error) {
        throw new apiError(400,`service:Server responded with  ${error.message}`);
    }



}
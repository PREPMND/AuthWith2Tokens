import { AuthUser } from "../Models/user-auth.model.js"
export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await AuthUser.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: true })
        return { accessToken, refreshToken }
    } catch {
        throw new apiError(500, "Something went wrong while generating tokens")
    }
}
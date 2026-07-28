import { apiError } from "../Utils/apiError.js";

export const userRegisterValidator = (req, res, next) => {
    try {

        const { username, email, password, fullName } = req.body;
        const isNonEmptyString = (value) =>
            typeof value === "string" && value.trim().length > 0;

        if (!isNonEmptyString(username) || !isNonEmptyString(email) || !isNonEmptyString(password) || !isNonEmptyString(fullName)) {
            return next(new apiError(400, "All fields (username, email, password, fullName) are required"));
        }

        req.validatedBody = {
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            fullName: fullName.trim(),
            password
        }

        next();
    } catch (error) {
        next(new apiError(400, `Payload validation was unsuccessfull , Server responde with -> ${error.message}`))
    }


}
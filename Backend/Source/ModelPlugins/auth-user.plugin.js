import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authUserPlugin = (AuthUserSchema) => {
    AuthUserSchema.pre("save", async function () {
        if (!this.isModified("password")) return;
        this.password = await bcrypt.hash(this.password, 10);
    });

    AuthUserSchema.methods.isPasswordCorrect = async function (password) {
        console.log("Entered:", password);
        console.log("Stored Hash:", this.password);

        const result = await bcrypt.compare(password, this.password);

        console.log("Compare Result:", result);
        return result;
    };

    AuthUserSchema.methods.generateAccessToken = function () {
        const generatedToken = jwt.sign(
            {
                _id: this._id,
                username: this.username,
                email: this.email,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECURITY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
        return generatedToken;
    }

    AuthUserSchema.methods.generateRefreshToken = function () {
        const generatedToken = jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECURITY,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        return generatedToken;
    }
}


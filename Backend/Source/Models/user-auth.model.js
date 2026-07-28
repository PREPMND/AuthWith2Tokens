import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authUserPlugin } from "../ModelPlugins/auth-user.plugin.js";
export const AuthUserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true});

AuthUserSchema.plugin(authUserPlugin);

export const AuthUser=mongoose.models.AuthUser || mongoose.model("AuthUser",AuthUserSchema);
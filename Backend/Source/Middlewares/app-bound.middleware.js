import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

export const appBoundMiddleWare = (app) => {
    app.use(
        cors({
            origin:process.env.CORS_ORIGIN,
            credentials: true,
        })
    );
    app.use(express.json({ limit: "16kb" }));//built in middlewares
    app.use(express.urlencoded({ limit: "16kb", extended: true }));
    app.use(express.static("public"));
    app.use(cookieParser());//external middlewares
}
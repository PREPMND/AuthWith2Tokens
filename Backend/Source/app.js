import express from "express";

import { appBoundMiddleWare } from "./Middlewares/app-bound.middleware.js";

export const app=express(); //creating an instance of the server,not actual server that will be done using listen method 

appBoundMiddleWare(app);

import { authRouter } from "./Routes/route.js";

app.use("/api/v1/users",authRouter);

app.get("/check", (req, res) => {
  res.status(200).send("Backend is working fine 🚀");
});
app.post("/register", (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).send("Missing required fields");
  }

  res.status(201).send(`User ${fullName} registered with email ${email}`);
});
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.ENVIROMENT === "production" ? null : err.stack
    });
});


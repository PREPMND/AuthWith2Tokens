import mongoose from "mongoose";
export const connectDataBase = async () => {
    await mongoose.connect(process.env.MONGODB_URL,{ serverSelectionTimeoutMS: 30000 });
    console.log("MongoDB Connected");
};

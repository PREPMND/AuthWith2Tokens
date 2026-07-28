import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

import { app } from "./app.js";
import { connectDataBase } from "./DBconnection/index.js";

await connectDataBase();

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on localhost:${PORT}`)
})
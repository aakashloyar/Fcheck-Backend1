import mongoose from 'mongoose';
import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
const app = express()
const port = 3000
import userrouter from "./routes/user"
import adminrouter from "./routes/admin"
const mongourl = process.env.MONGO_URL;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user",userrouter);
app.use("/admin",adminrouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
if(mongourl) {
  mongoose.connect(mongourl,{
    dbName: "Database1",
    family: undefined,
    hints: undefined,
    localAddress: undefined,
    localPort: undefined,
    lookup: undefined
  });
} 

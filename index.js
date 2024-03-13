const express = require('express')
const mongoose = require("mongoose");
require('dotenv').config();
const mongourl = process.env.MONGO_URL;
const app = express()
const port = 3000
const router=require("./routes/user")
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user",router);
app.use("/admin",admin);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
mongoose.connect("mongodb://localhost:27017/Database1",{dbName:"Database1"});

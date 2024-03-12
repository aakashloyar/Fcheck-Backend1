const express = require('express')
const app = express()
const port = 3000
const router=require("./routes/user")
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user",router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
mongoose.connect("mongodb://localhost:27017",{dbName:"Database1"});

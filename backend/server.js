const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require('./model/userSchema');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

require('./database/connectDb');
app.use(express.json())
app.use(require('./router/auth'))

app.listen(PORT,()=>{
    console.log(`Server Start At Port ${PORT}`);
})
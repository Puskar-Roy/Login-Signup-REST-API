const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
require("../database/connectDb");

router.get("/", (req, res) => {
  res.send("Hello Server from auth");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(422).json({ error: "404 error" });
  }

  try {
    const userExsist = await User.findOne({ email: email });

    if (userExsist) {
      return res.status(422).json({ error: "User Already Exists" });
    }
    const user = new User({ name, email, phone, work, password, cpassword });

    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "Sign Up Done !" });
    }
  }
  catch (error) {
    console.log(error);
  }
});



router.post("/login",async (req,res)=>{
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    res.status(422).json({ error: "404 error" });
  }

  try {
    const userExsist = await User.findOne({ email: email });
        if (!userExsist) {
          return res.status(422).json({ error: "User Does Not Exists" });
        }else{
          console.log();
          if (password == userExsist.password) {
            return res.status(200).json({ login: "Log In Successfull" });
          }

          res.status(200).json({ password: "Invalid" });
          
        }
    
  } catch (error) {
    console.log(error);
    
  }




})

module.exports = router;

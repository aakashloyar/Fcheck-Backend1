const express = require('express')
const router=express.Router();
const jwt=require('jsonwebtoken');
const {User}=require('../db/index');
const secret = process.env.SECRET;
router.use(express.json());
router.post("/signup",async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(user) {
            res.status(403).json({message:"User alredy exists"});
            return;
        }
        const newUser=new User({email,password});
        await newUser.save();
        const payload = {
            email: newUser.email
        };

        const token=jwt.sign(payload,secret,{expiresIn:'1hr'})
        res.status(200).json({message:"user created succesfully with token="+token})
        console.log(token);
        console.log("created succesfully");
    } catch(error) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }
    
})
// router.post("/signin",async(req,res)=>{

// })
module.exports =router
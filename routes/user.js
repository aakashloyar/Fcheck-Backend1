const express = require('express')
const router=express.Router
const {User}=require('../db/index');
router.post("/signup",async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=User.findOne();
        if(user) {
            res.status(403).json({message:"User alredy exists"});
            return;
        }
        const newUser=new User({email,password});
        await newUser.save();

        console.log("created succesfully");

    } catch(error) {
        res.status(500).json({message:"server error"})
        throw new Error(error);
    }
    
})

module.exports =router
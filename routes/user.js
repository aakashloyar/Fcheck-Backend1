const express = require('express')
const router=express.Router();
const jwt=require('jsonwebtoken');
const {User,Course}=require('../db/index');
const secret = process.env.SECRET;
const { authenticate } = require('../middleware/auth');
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
            email: newUser.email,
            role:'user'
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
router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email,password});
        if(!user) {
            res.status(403).json('invalid credentials');
            return;
        }
        const payload = {
            email: user.email,
            role:'user'
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }catch(error) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }
})
router.post('/courses',authenticate,async (req,res)=>{
    try{
        const courses=await Course.find({published:true});
        res.json({courses})
    } catch(err) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }  
})
router.post('/courses/:courseId',authenticate,async(req,res,next)=>{
    const course=await Course.findById(req.params.courseId);
    if(course) {
        const user=User.findOne(req.user.email);
        if(user) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json('course purchased successfully');
        } else {
            res.status(403).json({message:'User not found'});
        }
    }
    else {
        res.send(404).json({message:'Course not found'});
    }
})
router.post('purchasedCourses',authenticate,async (req,res)=>{
    const user = await User.findOne({ username: req.user.username });
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
})
module.exports =router
import mongoose from "mongoose"
import express from "express"
const router=express.Router();
import jwt from 'jsonwebtoken'
import  {User,Course} from '../db/index';
import { Request,Response,NextFunction } from "express";
const secret = process.env.SECRET||"";
import { authenticate } from '../middleware/auth';
router.use(express.json());

router.post("/signup",async (req:Request,res:Response)=>{
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
    } catch(error:any) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }
    
})
router.post("/signin",async(req:Request,res:Response)=>{
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
    }catch(error:any) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }
})
router.post('/courses',authenticate,async (req:Request,res:Response)=>{
    try{
        const courses=await Course.find({published:true});
        res.json({courses})
    } catch(err:any) {
        res.status(500).json({message:"server error"})
        console.error(err.message);
    }  
})
router.post('/courses/:courseId', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    const courseId=req.params.courseId;
    const course = await Course.findById(courseId);
    
    if (typeof courseId==="string") {
        const userId = req.headers["userId"];
        const user = await User.findOne({ _id: userId });

        if (user) {
            user.purchasedCourses.push(new mongoose.Types.ObjectId(courseId)); // Push courseId instead of the whole course document
            await user.save();
            return res.json('Course purchased successfully');
        } else {
            return res.status(403).json({ message: 'User not found' });
        }
    } else {
        return res.status(404).json({ message: 'Course not found' });
    }
});


router.post('purchasedCourses',authenticate,async (req:Request,res:Response)=>{
    const userId=req.headers["userId"];
    const user=await User.findOne({_id:userId});
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
})
export default router
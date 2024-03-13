const express = require('express')
const router=express.Router();
const jwt=require('jsonwebtoken');
const {User,Course,Admin}=require('../db/index');
const secret = process.env.SECRET;
const { authenticate } = require('../middleware/auth');
router.use(express.json());
router.post("/signup",async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Admin.findOne({email});
        if(user) {
            res.status(403).json({message:"User alredy exists"});
            return;
        }
        const newUser=new Admin({email,password});
        await newUser.save();
        const payload = {
            email: newUser.email,
            role:'admin'
        };
        const token=jwt.sign(payload,secret,{expiresIn:'1hr'})
        res.status(200).json({message:"Admin created succesfully with token="+token})
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
        const admin=await Admin.findOne({email,password});
        if(!admin) {
            res.status(403).json('invalid credentials');
            return;
        }
        const payload = {
            email: admin.email,
            role:'admin'
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }catch(error) {
        res.status(500).json({message:"server error"})
        console.error(error.message);
    }
})
router.post('/courses/add', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});
router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
module.exports={
    router
}
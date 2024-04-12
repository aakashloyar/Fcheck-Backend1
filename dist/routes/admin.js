"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { User, Course, Admin } = require('../db/index');
const secret = process.env.SECRET || "";
const { authenticate } = require('../middleware/auth');
router.use(express.json());
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield User.findOne({ email });
            if (user) {
                res.status(403).json({ message: "User alredy exists" });
                return;
            }
            const newUser = new Admin({ email, password });
            yield newUser.save();
            const payload = {
                email: newUser.email,
                role: 'admin'
            };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1hr' });
            res.status(200).json({ message: "user created succesfully with token=" + token });
            console.log(token);
            console.log("created succesfully");
        }
        catch (error) {
            res.status(500).json({ message: "server error" });
            console.error(error.message);
        }
    }));
    try {
        const { email, password } = req.body;
        const user = yield Admin.findOne({ email });
        if (user) {
            res.status(403).json({ message: "User alredy exists" });
            return;
        }
        const newUser = new Admin({ email, password });
        yield newUser.save();
        const payload = {
            email: newUser.email,
            role: 'admin'
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1hr' });
        res.status(200).json({ message: "Admin created succesfully with token=" + token });
        console.log(token);
        console.log("created succesfully");
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
        console.error(error.message);
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield Admin.findOne({ email, password });
        if (!admin) {
            res.status(403).json('invalid credentials');
            return;
        }
        const payload = {
            email: admin.email,
            role: 'admin'
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
        console.error(error.message);
    }
}));
router.post('/courses/add', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new Course(req.body);
    yield course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
}));
router.get('/courses', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield Course.find({});
    res.json({ courses });
}));
router.get('/course/:courseId', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield Course.findById(courseId);
    res.json({ course });
}));
router.put('/courses/:courseId', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.sendStatus(404).json({ message: 'Course not found' });
    }
}));
exports.default = router;

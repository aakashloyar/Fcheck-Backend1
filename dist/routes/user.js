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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../db/index");
const secret = process.env.SECRET || "";
const auth_1 = require("../middleware/auth");
router.use(express_1.default.json());
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield index_1.User.findOne({ email });
        if (user) {
            res.status(403).json({ message: "User alredy exists" });
            return;
        }
        const newUser = new index_1.User({ email, password });
        yield newUser.save();
        const payload = {
            email: newUser.email,
            role: 'user'
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
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield index_1.User.findOne({ email, password });
        if (!user) {
            res.status(403).json('invalid credentials');
            return;
        }
        const payload = {
            email: user.email,
            role: 'user'
        };
        const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
        console.error(error.message);
    }
}));
router.post('/courses', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield index_1.Course.find({ published: true });
        res.json({ courses });
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
        console.error(err.message);
    }
}));
router.post('/courses/:courseId', auth_1.authenticate, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const course = yield index_1.Course.findById(courseId);
    if (typeof courseId === "string") {
        const userId = req.headers["userId"];
        const user = yield index_1.User.findOne({ _id: userId });
        if (user) {
            user.purchasedCourses.push(new mongoose_1.default.Types.ObjectId(courseId)); // Push courseId instead of the whole course document
            yield user.save();
            return res.json('Course purchased successfully');
        }
        else {
            return res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        return res.status(404).json({ message: 'Course not found' });
    }
}));
router.post('purchasedCourses', auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield index_1.User.findOne({ _id: userId });
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
exports.default = router;

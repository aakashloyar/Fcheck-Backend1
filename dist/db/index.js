"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.User = exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    email: String,
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});
const adminSchema = new mongoose_1.default.Schema({
    email: String,
    password: String
});
exports.Course = mongoose_1.default.model('Course', courseSchema);
exports.User = mongoose_1.default.model('User', UserSchema);
exports.Admin = mongoose_1.default.model('Admin', adminSchema);

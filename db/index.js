const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email:String,
  password:String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});
const adminSchema = new mongoose.Schema({
  email: String,
  password: String
});
const Course = mongoose.model('Course', courseSchema);
const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('User', UserSchema);
module.exports ={
  User, Course,Admin
}
import mongoose from 'mongoose';
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
export const Course = mongoose.model('Course', courseSchema);
export const User = mongoose.model('User', UserSchema);
export const Admin = mongoose.model('Admin', adminSchema);
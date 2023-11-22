import mongoose from 'mongoose';

// Making Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // defining timestamps for createAt, updateAt automatic strored

// Exporting modeling schema actually creating schema Model
export const User = mongoose.model('User', userSchema);

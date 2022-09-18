import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, require: true }
});

export default mongoose.model("Users", userSchema);
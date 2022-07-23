import mongoose from 'mongoose'

const gamerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  tag: { type: String, unique: true },
  password: { type: String, require: true }
});

export default mongoose.model("gamer", gamerSchema);
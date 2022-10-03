import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  content: { type: String, require: true },
  author: { type: String, require: true },
});

export default mongoose.model("Posts", postSchema);
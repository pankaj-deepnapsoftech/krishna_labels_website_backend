import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  content: { type: String, required: true },
  coverImage: { type: String },
  tags: [String],
  status: { type: String, default: 'New' },
  dateAdded: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

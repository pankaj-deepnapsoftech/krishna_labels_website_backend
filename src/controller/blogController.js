import Blog from '../models/blogModel.js';
import { config } from '../config/env.config.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${config.NODE_ENV !== 'development' ? config.IMAGE_URL : config.LOCAL_IMAGE_URL}/${req.file.filename}`
      : null;
    const blog = new Blog({
      ...req.body,
      coverImage: imageUrl,
    });

    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ dateAdded: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, author, content, tags, status } = req.body;

    const updateData = {
      title,
      author,
      content,
      tags,
      status,
    };

    if (req.file) {
      // If an image is uploaded, include its path
      const baseUrl =
        config.NODE_ENV !== 'development'
          ? config.IMAGE_URL
          : config.LOCAL_IMAGE_URL;

      updateData.coverImage = `${baseUrl}/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

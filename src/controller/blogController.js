import Blog from '../models/blogModel.js';
import { config } from '../config/env.config.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
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
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const blogs = await Blog.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    // Include total count for pagination
    const totalBlogs = await Blog.countDocuments();

    res.json({
      blogs,
      totalBlogs,
      currentPage,
      totalPages: Math.ceil(totalBlogs / pageSize),
    });
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

// Get Blog by Slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, author, content, tags, status, coverImage } = req.body;

    // Find the current blog
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update the fields
    if (title !== undefined) blog.title = title;
    if (author !== undefined) blog.author = author;
    if (content !== undefined) blog.content = content;
    if (tags !== undefined) blog.tags = tags;
    if (status !== undefined) blog.status = status;
    if (coverImage !== undefined) blog.coverImage = coverImage;

    // Save the blog (this will trigger the pre-save middleware to update slug if title changed)
    const updated = await blog.save();

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

export const regenerateSlugs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    let updated = 0;

    for (const blog of blogs) {
      if (!blog.slug) {
        await blog.save();
        updated++;
      }
    }

    res.json({ message: `Updated ${updated} blogs with slugs` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

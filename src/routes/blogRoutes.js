import express from 'express';
import upload from '../middleware/upload.js';
import {
  createBlog,
  getBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  regenerateSlugs,
} from '../controller/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/regenerate-slugs', regenerateSlugs);
router.get('/id/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/:slug', getBlogBySlug);

export default router;

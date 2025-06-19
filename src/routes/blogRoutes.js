import express from 'express';
import upload from '../middleware/upload.js';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controller/blogController.js';

const router = express.Router();

router.post('/', upload.single('coverImage'), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;

// src/routes/productRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controller/productController.js';

const router = express.Router();

// Allow image upload (max 5)
router.post('/', upload.array('images', 5), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

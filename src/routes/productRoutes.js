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


router.post('/', upload.single('images'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.array('images'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;

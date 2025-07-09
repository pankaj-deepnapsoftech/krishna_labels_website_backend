// src/controller/productController.js
import { config } from '../config/env.config.js';
import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (currentPage - 1) * pageSize;

    const products = await Product.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    // Extract all the fields from req.body
    const {
      name,
      category,
      shortDescription,
      longDescription,
      price,
      status,
      dateAdded,
      images,
    } = req.body;

    // Prepare update data object
    const updateData = {
      name,
      category,
      shortDescription,
      longDescription,
      price,
      status,
      dateAdded,
      images,
    };

    // Handle images: if files uploaded, update images path array
    // if (req.files && req.files.length > 0) {
    //   // Using your config URLs depending on env
    //   // const baseUrl =
    //   //   config.NODE_ENV !== 'development'
    //   //     ? config.IMAGE_URL
    //   //     : config.LOCAL_IMAGE_URL;

    //   // Map all uploaded files to full URLs
    //   updateData.images = req.files.map(
    //     (file) => `${baseUrl}/${file.filename}`
    //   );
    // }

    // Update product document with new data
    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

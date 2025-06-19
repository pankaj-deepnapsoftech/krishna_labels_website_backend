import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: Number },
  images: [{ type: String }],
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' },
});

const Product = mongoose.model('Product', productSchema);
export default Product;

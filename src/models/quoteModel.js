import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;

import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, default: 'Happy Customer', required: true },
  star: { type: Number, required: true },
  message: { type: String, required: true },
  company: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: 'new' },
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;

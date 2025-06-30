import { Schema, model } from 'mongoose';

const HelpAndQuiteSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  question: { type: String },
  message: { type: String },
  remark: { type: String },
  dateAdded: { type: Date, default: Date.now },
  type: { type: String, required: true, enum: ['Help', 'Quites'] },
});

export const HelpAndQuiteModal = model('HelpAndQuite', HelpAndQuiteSchema);

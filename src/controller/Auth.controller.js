import jwt from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { config } from '../config/env.config.js';
import Product from '../models/productModel.js';
import Quote from '../models/quoteModel.js';
import Contact from '../models/contactModel.js';
import { HelpAndQuiteModal } from '../models/help&quite.js';
import Blog from '../models/blogModel.js';

export const LoginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email !== 'mallick@krishnalabelsinc.com') {
    return res.status(400).json({
      message: 'Wrong Credentials',
    });
  }

  if (password !== 'mallick@1234') {
    return res.status(400).json({
      message: 'Wrong Credentials',
    });
  }

  const token = jwt.sign(
    { email: 'mallick@krishnalabelsinc.com' },
    config.JWT_SECRET
  );

  return res.status(200).json({
    message: 'Login Successful',
    token,
  });
});

export const DashboardCardData = AsyncHandler(async (req, res) => {
  const products = await Product.find().countDocuments();
  const product_quotes = await Quote.find().countDocuments();
  const contacts = await Contact.find().countDocuments();
  const Quick_Quotes = await HelpAndQuiteModal.find({
    type: 'Quites',
  }).countDocuments();
  const Help_Enquiries = await HelpAndQuiteModal.find({
    type: 'Help',
  }).countDocuments();
  const blog = await Blog.find().countDocuments();
  return res.status(200).json({
    message: 'Dashboard Card data',
    data: {
      products,
      product_quotes,
      contacts,
      Quick_Quotes,
      Help_Enquiries,
      blog,
    },
  });
});

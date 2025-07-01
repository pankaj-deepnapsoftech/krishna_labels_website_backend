import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoute.js';
import { fileURLToPath } from 'url';
import path from 'path';
import blogRoutes from './routes/blogRoutes.js';
import { DashboardCardData, LoginUser } from './controller/Auth.controller.js';
import HelpRoutes from './routes/helpRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import testimonialRoutes from './routes/testimonialRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8089;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', LoginUser);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/help', HelpRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.use('/api/dashboard', DashboardCardData);

app.use('/file', express.static(path.join(__dirname, '../', 'public/temp')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

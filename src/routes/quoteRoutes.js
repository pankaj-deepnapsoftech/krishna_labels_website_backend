import express from 'express';
import { createQuote, getQuotes, deleteQuote } from '../controller/quoteController.js';

const router = express.Router();

router.post('/', createQuote); 
router.get('/', getQuotes);    
router.delete('/:id', deleteQuote); 

export default router;

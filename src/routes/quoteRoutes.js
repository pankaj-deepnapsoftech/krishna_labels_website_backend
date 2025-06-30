import express from 'express';
import {
  createQuote,
  getQuotes,
  deleteQuote,
  updateRemark,
} from '../controller/quoteController.js';

const router = express.Router();

router.post('/', createQuote);
router.get('/', getQuotes);
router.delete('/:id', deleteQuote);
router.patch('/:id', updateRemark);

export default router;

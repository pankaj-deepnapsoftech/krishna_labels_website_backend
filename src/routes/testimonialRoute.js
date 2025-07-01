import { Router } from 'express';
import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from '../controller/testimonialController.js';

const router = Router();

router.post('/', createTestimonial);
router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;

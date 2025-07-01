import Testimonial from '../models/testimonialModel.js';

export const createTestimonial = async (req, res) => {
  try {
    const { name, star, message, company } = req.body;
    const testimonial = new Testimonial({ name, star, message, company });
    await testimonial.save();
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ dateAdded: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { name, star, message, company } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, star, message, company },
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: 'Testimonial not found' });
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(200).json({ success: false, message: error.message });
  }
};

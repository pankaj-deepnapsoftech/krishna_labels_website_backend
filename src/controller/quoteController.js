import Quote from "../models/quoteModel.js";
import Product from "../models/productModel.js";

  // POST - Create quote
  export const createQuote = async (req, res) => {
    try {
      const { productId, quantity, name, email, phone, address } = req.body;

      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const quote = new Quote({
        product: product._id,
        productName: product.name,
        image: product.images[0],
        quantity,
        name,
        email,
        phone,
        address
      });
      const saved = await quote.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// GET - All quotes
export const getQuotes = async (req, res) => {
  try {
	const { page, limit } = req.query;
	const currentPage = parseInt(page) || 1;
	const pageSize = parseInt(limit) || 10;
	const skip = (currentPage - 1) * pageSize;

    const quotes = await Quote.find()
	.sort({ _id: -1 })
	.skip(skip)
	.limit(pageSize);

    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - quote by ID
export const deleteQuote = async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quote deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

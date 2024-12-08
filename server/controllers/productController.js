const Product = require("../models/Product");

// Get all products // single product
const getProducts = async (req, res) => {
    const { productId, page = 1, limit = 10 } = req.query;

    try {
        if (productId) {
            // If productId is passed, fetch a single product
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json({ product });
        } else {
            // If no productId, fetch all products with pagination
            const products = await Product.find()
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit));
            const total = await Product.countDocuments();
            return res.json({
                products,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts };
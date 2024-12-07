const { fakeProducts } = require("../fakeData");
const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await Product.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Product.countDocuments();
        res.json({ products, total, page, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts };
const { fakeProducts } = require("../fakeData");

// Get all products
const getProducts = async (req, res) => {
    try {
        res.json(fakeProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts };
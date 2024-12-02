const express = require('express');
const { getProducts } = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Register user
router.get('/', getProducts);

module.exports = router;
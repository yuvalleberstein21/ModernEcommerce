const express = require('express');
const { getProducts, getCategories, createProduct } = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for temporary file storage
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Allowed file types
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

const router = express.Router();

// GET PRODUCTS && GET PRODUCT  BY ID
router.get('/', getProducts);
router.post('/createProduct', upload.single('image'), createProduct);
router.get('/categories', getCategories);


// router.post('/createCategory', upload.single('image'), createCategory);
// router.get('/category/:categoryName', getProductsByCategory);


// router.post('/', authenticateJWT, admin, createProduct);

// router.put('/:id', authenticateJWT, admin, updateProduct);
// router.delete('/:id', authenticateJWT, admin, deleteProduct);
// router.post('/:id/reviews', authenticateJWT, createProductReview);

module.exports = router;
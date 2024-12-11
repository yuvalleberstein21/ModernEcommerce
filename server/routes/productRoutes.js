const express = require('express');
const { getProducts, getProductsByCategory, createCategory } = require('../controllers/productController');
const authenticateJWT = require('../middleware/authenticateJWT');
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/') // make sure this uploads folder exists
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
    }
});

const router = express.Router();

// GET PRODUCTS && GET PRODUCT  BY ID
router.get('/', getProducts);
router.post('/createCategory', upload.single('image'), createCategory);
router.get('/category/:categoryName', getProductsByCategory);


// router.post('/', authenticateJWT, admin, createProduct);

// router.put('/:id', authenticateJWT, admin, updateProduct);
// router.delete('/:id', authenticateJWT, admin, deleteProduct);
// router.post('/:id/reviews', authenticateJWT, createProductReview);

module.exports = router;
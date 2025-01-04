const Product = require("../models/Product");
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;
const socketIo = require('socket.io');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Get all products // single product
const getProducts = asyncHandler(async (req, res) => {
    const { productId, page = 1, limit = 6, category, minPrice, maxPrice, inStock, rating, sort } = req.query;

    try {
        if (productId) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.json({ product });
        } else {
            const query = {};

            if (category) query.category = category;
            if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
            if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
            if (inStock !== undefined) query.inStock = inStock === 'true';
            if (rating) query.rating = { $gte: Number(rating) };

            const sortOptions = {};
            if (sort === 'priceAsc') sortOptions.price = 1;
            if (sort === 'priceDesc') sortOptions.price = -1;
            if (sort === 'ratingDesc') sortOptions.rating = -1;

            const products = await Product.find(query)
                .sort(sortOptions)
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit));

            const total = await Product.countDocuments(query);

            return res.json({
                products,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            });
        }
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: "Error retrieving products", error: err.message });
    }
});
// const getProducts = asyncHandler(async (req, res) => {
//     const { productId, page = 1, limit = 6, category } = req.query;

//     try {
//         if (productId) {
//             // If productId is passed, fetch a single product
//             const product = await Product.findById(productId);
//             if (!product) {
//                 return res.status(404).json({ message: "Product not found" });
//             }
//             return res.json({ product });
//         } else {
//             // Base query
//             const query = category ? { category } : {};

//             // Fetch products with optional category filter and pagination
//             const products = await Product.find(query)
//                 .limit(Number(limit))
//                 .skip((Number(page) - 1) * Number(limit));

//             const total = await Product.countDocuments(query);

//             return res.json({
//                 products,
//                 total,
//                 page: Number(page),
//                 totalPages: Math.ceil(total / limit),
//             });
//         }
//     } catch (err) {
//         console.error('Error fetching products:', err);
//         res.status(500).json({ message: "Error retrieving products", error: err.message });
//     }
// });



const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    image: { $first: "$image" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    image: 1
                }
            }
        ]);
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({
            message: "Error retrieving categories",
            error: err.message
        });
    }
});

const createProduct = asyncHandler(async (req, res) => {
    try {
        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products', // Optional: specify a folder in Cloudinary
        });

        // Extract other product details from request body
        const {
            name,
            description,
            price,
            stock,
            category
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            stock,
            category,
            image: uploadResult.secure_url, // Use the Cloudinary URL
            rating: 0,
            numReviews: 0
        });


        const createdProduct = await product.save();

        // io.emit('newProductAdded', createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(400).json({
            message: 'Error creating product',
            error: error.message
        });
    }
});

// const createCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         // Check if category already exists
//         const existingCategory = await Category.findOne({ name });
//         if (existingCategory) {
//             return res.status(400).json({ message: 'Category already exists' });
//         }

//         // Handle image upload to Cloudinary
//         let imageUrl = '/default-category.jpg'; // Default image
//         if (req.file) {
//             try {
//                 // Upload image to Cloudinary
//                 const result = await cloudinary.uploader.upload(req.file.path, {
//                     folder: 'categories', // Optional: specify a folder in Cloudinary
//                     // You can add more options like transformation, etc.
//                 });

//                 // Use the secure_url from Cloudinary
//                 imageUrl = result.secure_url;
//             } catch (uploadError) {
//                 console.error('Cloudinary upload error:', uploadError);
//                 return res.status(500).json({ message: 'Image upload failed', error: uploadError.message });
//             }
//         }

//         // Create new category
//         const newCategory = new Category({
//             name,
//             description,
//             imageUrl
//         });

//         const savedCategory = await newCategory.save();

//         res.status(201).json({
//             message: 'Category created successfully',
//             category: savedCategory
//         });
//     } catch (error) {
//         console.error('Error creating category:', error);
//         res.status(500).json({ message: 'Error creating category', error: error.message });
//     }
// }
module.exports = { getProducts, getCategories, createProduct };
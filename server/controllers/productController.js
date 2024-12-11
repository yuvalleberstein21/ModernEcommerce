const Category = require("../models/Category");
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

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const {
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        // Find category by name
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Debug: Log the category ID
        console.log('Category ID:', category._id);

        // Build query
        const query = { category: category._id };

        // Debug: Check if any products exist for this category
        console.log('Checking for existing products...', query);
        // TODO: Implement this check to prevent fetching products that already exist in the database.
        const existingProducts = await Product.find({ category: category._id });
        console.log('Existing Products:', existingProducts);

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;

        // Pagination
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch products
        const products = await Product.find(query)
            .populate('category', 'name')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber);

        // Total count
        const totalProducts = await Product.countDocuments(query);

        res.json({
            products,
            category: category.name,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalProducts / limitNumber),
                totalProducts,
                pageSize: limitNumber
            }
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({
            message: 'Error retrieving products',
            error: error.message
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Handle image upload to Cloudinary
        let imageUrl = '/default-category.jpg'; // Default image
        if (req.file) {
            try {
                // Upload image to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'categories', // Optional: specify a folder in Cloudinary
                    // You can add more options like transformation, etc.
                });

                // Use the secure_url from Cloudinary
                imageUrl = result.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return res.status(500).json({ message: 'Image upload failed', error: uploadError.message });
            }
        }

        // Create new category
        const newCategory = new Category({
            name,
            description,
            imageUrl
        });

        const savedCategory = await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            category: savedCategory
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
}
module.exports = { getProducts, getProductsByCategory, createCategory };
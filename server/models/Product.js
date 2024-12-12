const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        require: true,
    },
    reviews: [reviewsSchema],
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
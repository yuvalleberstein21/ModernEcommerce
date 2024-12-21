const asyncHandler = require('express-async-handler');
const Order = require("../models/Order");

const createOrder = asyncHandler(async (req, res) => {
    console.log(req.user);
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items')
    } else {
        const formattedOrderItems = orderItems.map((item) => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item.product,
        }));

        const order = new Order({
            orderItems: formattedOrderItems,
            user: req.user.id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});


const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    )
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
});

module.exports = { createOrder, getOrderById };
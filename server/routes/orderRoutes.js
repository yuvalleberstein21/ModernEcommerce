const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const { createOrder, getOrderById } = require('../controllers/orderController');

const router = express.Router();

router.post('/', authenticateJWT, createOrder);
// router.get('/myorders', authenticateJWT, getUserOrders);
router.get('/:id', authenticateJWT, getOrderById);
// router.get('/', authenticateJWT, admin, getAllOrders);
// router.put('/:id/pay', authenticateJWT, updateOrderToPaid);
// router.put('/:id/deliver', authenticateJWT, admin, updateOrderToDelivered);


module.exports = router;
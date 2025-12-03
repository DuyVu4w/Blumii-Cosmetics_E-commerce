const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const verifyToken = require('../middleware/auth.middleware');

// add new order
router.post('/addOrder', orderController.addOrder)
// order history
router.get('/my-orders', verifyToken, orderController.getMyOrders);
// get order by id
router.get('/:id', verifyToken, orderController.getOrderById);

module.exports = router
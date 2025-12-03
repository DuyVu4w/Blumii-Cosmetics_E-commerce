const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const verifyToken = require('../middleware/auth.middleware');

router.post('/addOrder', orderController.addOrder)
router.get('/my-orders', verifyToken, orderController.getMyOrders);
router.get('/my-order-test/:userId', orderController.getMyOrdersTest)
module.exports = router
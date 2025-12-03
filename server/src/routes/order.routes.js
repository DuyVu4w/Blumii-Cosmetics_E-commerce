const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const verifyToken = require('../middleware/auth.middleware');

router.post('/addOrder', orderController.addOrder)
// order history
router.get('/my-orders', verifyToken, orderController.getMyOrders);
module.exports = router
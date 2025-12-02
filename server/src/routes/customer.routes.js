const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const verifyToken = require('../middleware/auth.middleware');

// Tất cả các route này đều cần đăng nhập
router.use(verifyToken);

router.get('/profile', customerController.getProfile);
router.put('/profile', customerController.updateProfile);
router.post('/change-password', customerController.changePassword);

router.post('/addresses', customerController.addAddress);
router.delete('/addresses/:addressId', customerController.deleteAddress);

module.exports = router;
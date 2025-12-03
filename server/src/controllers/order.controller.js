const Order = require('../models/Order.model');


exports.addOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            discountAmount,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No product' });
        }

        const order = new Order({
            // user: req.user._id, 
            user: req.user ? req.user._id : req.body.userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            discountAmount: discountAmount || 0, // Mặc định 0 nếu không có
            totalPrice,

            // Logic tính điểm thưởng: 10% của totalPrice 
            pointsEarned: Math.round(totalPrice * 0.1),

        });

        const createdOrder = await order.save()

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            message: 'Error',
            error: error.message
        });
    }
}
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


exports.getMyOrders = async (req, res) => {
    try {
        // Lấy ID user từ token (đã qua middleware xác thực)
        // Nếu bạn test không có token thì dùng req.query.userId hoặc req.body.userId (nhưng không khuyến khích vì bảo mật)
        const userId = req.user._id || req.user.id
        console.log(userId)
        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 }) // Sắp xếp đơn mới nhất lên đầu
            // .populate('orderItems.product', 'name price image'); // Bỏ comment dòng này nếu muốn lấy chi tiết thông tin sản phẩm thay vì chỉ ID
            
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error)
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        })
    }
}

// đã lấy được order qua url
exports.getMyOrdersTest = async (req, res) => {
    try {
        // CÁCH 1: Lấy từ URL params (Ví dụ: /test-orders/:userId)
        const { userId } = req.params;
        console.log(userId)
        // CÁCH 2: Nếu bạn thích dùng query (Ví dụ: /test-orders?id=...)
        // const userId = req.query.id; 

        console.log("Testing with User ID:", userId);

        // Kiểm tra xem có ID chưa
        if (!userId) {
            return res.status(400).json({ message: "Vui lòng cung cấp User ID trên URL" });
        }

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 });
            
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        });
    }
};
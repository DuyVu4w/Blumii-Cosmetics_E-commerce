const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema con cho từng sản phẩm trong giỏ (Order Item)
const orderItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    // Lưu lại tên và ảnh để nhỡ sản phẩm gốc bị xóa thì đơn hàng vẫn hiển thị được
    name: { type: String, required: true },
    image: { type: String, required: true },
    
    quantity: { type: Number, required: true, min: 1 },
    
    // giá tại thời điểm mua (có khuyễn mãi, voucher, ...)
    price: { type: Number, required: true } 
});

// Schema order
const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },

    // Danh sách sản phẩm
    orderItems: [orderItemSchema],

    // Địa chỉ giao hàng (Lưu cứng, không tham chiếu)
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }, 
        city: { type: String, required: true }
    },

    // Phương thức thanh toán
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'VNPAY'], 
        default: 'COD'
    },

    // Kết quả thanh toán (cho Online Payment)
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },

    // Các loại phí và tổng tiền
    itemsPrice: { type: Number, required: true, default: 0 }, // Tổng tiền hàng
    shippingPrice: { type: Number, required: true, default: 0 }, // Phí ship
    discountAmount: { type: Number, default: 0 }, // Số tiền được giảm
    totalPrice: { type: Number, required: true, default: 0 }, // Tổng phải trả cuối cùng

    // Trạng thái đơn hàng hiện tại
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    // Lịch sử trạng thái (Yêu cầu của đồ án: Order Tracking)
    statusHistory: [
        {
            status: { type: String },
            date: { type: Date, default: Date.now },
            note: { type: String } 
        }
    ],

    pointsEarned: {
        type: Number,
        default: 0 // 10% của totalPrice sẽ lưu vào đây
    },
    
    deliveredAt: { type: Date },

}, {
    timestamps: true 
});

// Middleware: Tự động cập nhật statusHistory mỗi khi đổi status
orderSchema.pre('save', function(next) {
    // Chỉ chạy khi trường 'status' bị thay đổi
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            date: new Date()
        });
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
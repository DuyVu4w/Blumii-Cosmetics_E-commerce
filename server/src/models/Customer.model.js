const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: String,
    ward: String,
    district: String,
    province: String,
    isDefault: { type: Boolean, default: false }
});

const CustomerSchema = new mongoose.Schema({
    customer_name: { type: String, required: true },
    // Số điện thoại không bắt buộc lúc đăng ký Social, nhưng cần unique nếu có
    phone_number: { type: String, unique: true, sparse: true }, 
    email: { type: String, required: true, unique: true },
    
    // Thay đổi: Hỗ trợ nhiều địa chỉ
    addresses: [AddressSchema], 
    
    password: { type: String, required: true },
    status: { type: String, default: 'active' },
    
    // Fields cho chức năng quên mật khẩu
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
    createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
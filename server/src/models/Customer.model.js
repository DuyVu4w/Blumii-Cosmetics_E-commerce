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
    phone_number: { type: String, unique: true, sparse: true }, 
    email: { type: String, required: true, unique: true },
    
    addresses: [AddressSchema], 
    
    password: { type: String, required: true },
    status: { type: String, default: 'active' },
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
    createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
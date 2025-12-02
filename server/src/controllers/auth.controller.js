const Customer = require('../models/Customer.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_jwt_secret';
const DEFAULT_SIGNUP_PASSWORD = process.env.DEFAULT_SIGNUP_PASSWORD || 'default_secure_password_123456';

// [POST] /api/auth/register
exports.register = async (req, res) => {
    // Nhận address là chuỗi từ FE (đã format) hoặc object
    const { customer_name, phone_number, email, address } = req.body; 
    
    if (!customer_name || !email) {
        return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Tên và Email.' });
    }

    try {
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({ success: false, message: 'Email này đã được đăng ký.' });
        }

        if (phone_number) {
            const existingPhone = await Customer.findOne({ phone_number });
            if (existingPhone) return res.status(409).json({ success: false, message: 'Số điện thoại đã được sử dụng.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DEFAULT_SIGNUP_PASSWORD, salt);

        // Xử lý địa chỉ ban đầu thành object Address đầu tiên
        // Giả sử FE gửi chuỗi text, ta lưu vào street hoặc parse ra. 
        // Ở đây ta lưu đơn giản vào street nếu là string.
        const initialAddress = {
            street: typeof address === 'string' ? address : '',
            ward: '', district: '', province: '', // Có thể cập nhật sau
            isDefault: true
        };

        const newCustomer = new Customer({
            customer_name,
            phone_number: phone_number || null, // Cho phép null
            email,
            addresses: [initialAddress], // Lưu vào mảng
            password: hashedPassword,
            status: 'active',
        });

        await newCustomer.save();
        
        const token = jwt.sign({ id: newCustomer._id, email: newCustomer.email, role: 'customer' }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ 
            success: true, 
            message: 'Đăng ký thành công!',
            token: token 
        });

    } catch (error) {
        console.error('Lỗi Đăng ký:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
};

// [POST] /api/auth/login (Giữ nguyên logic, chỉ đảm bảo import đúng model)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu.' });
    }

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng.' });
        }

        const token = jwt.sign({ id: customer._id, email: customer.email, role: 'customer' }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            success: true, 
            message: 'Đăng nhập thành công!',
            token: token 
        });

    } catch (error) {
        console.error('Lỗi Đăng nhập:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
};
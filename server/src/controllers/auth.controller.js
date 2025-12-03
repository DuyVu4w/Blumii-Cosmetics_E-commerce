const Customer = require('../models/Customer.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/email.service'); // Import Service gửi email

require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_jwt_secret';
const DEFAULT_SIGNUP_PASSWORD = process.env.DEFAULT_SIGNUP_PASSWORD || 'default_secure_password_123456';

// [POST] /api/auth/register
exports.register = async (req, res) => {
    const { customer_name, phone_number, email, address } = req.body; 
    
    if (!customer_name || !phone_number || !email || !address) {
        return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    try {
        const existingCustomer = await Customer.findOne({ $or: [{ email }, { phone_number }] });
        if (existingCustomer) {
            return res.status(409).json({ success: false, message: 'Email hoặc Số điện thoại đã được đăng ký.' });
        }

        // 1. Tạo mật khẩu ngẫu nhiên
        const randomPassword = crypto.randomBytes(4).toString('hex'); 

        // 2. Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomPassword, salt);

        const newCustomer = new Customer({
            customer_name,
            phone_number,
            email,
            address,
            password: hashedPassword,
            status: 'active',
        });

        await newCustomer.save();
        
        const emailSubject = 'Thông tin tài khoản BLUMMI COSMETICS';
        const emailContent = `
            <h3>Chào mừng bạn đến với Fruitables!</h3>
            <p>Tài khoản của bạn đã được tạo thành công.</p>
            <p>Mật khẩu đăng nhập của bạn là: <strong style="font-size: 16px; color: #81c408;">${randomPassword}</strong></p>
            <p>Vui lòng đăng nhập và đổi mật khẩu ngay để đảm bảo an toàn.</p>
            <br/>
            <p>Trân trọng,<br/>Đội ngũ Fruitables</p>
        `;
        
        await emailService.sendEmail(email, emailSubject, emailContent);

        const token = jwt.sign({ id: newCustomer._id, email: newCustomer.email, role: 'customer' }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            success: true, 
            message: 'Đăng ký thành công! Mật khẩu đã được gửi tới email của bạn.',
            token: token
        });

    } catch (error) {
        console.error('Lỗi Đăng ký MongoDB:', error);
        res.status(500).json({ success: false, message: 'Đăng ký thất bại do lỗi máy chủ.' });
    }
};

// [POST] /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ email và mật khẩu.' });
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

        const token = jwt.sign({ id: customer._id, email: customer.email, role: 'customer' }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            success: true, 
            message: 'Đăng nhập thành công!',
            token: token 
        });

    } catch (error) {
        console.error('Lỗi Đăng nhập MongoDB:', error);
        res.status(500).json({ success: false, message: 'Đăng nhập thất bại do lỗi máy chủ.' });
    }
};

// --- PASSWORD RECOVERY (Đã sửa lỗi biến randomPassword) ---

// [POST] /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Email không tồn tại trong hệ thống.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        customer.resetPasswordToken = resetToken;
        customer.resetPasswordExpires = Date.now() + 3600000; // 1 giờ

        await customer.save();

        // Gửi Token qua Email
        const emailSubject = 'Yêu cầu khôi phục mật khẩu - BLUMMI COSMETICS';
        const emailContent = `
            <h3>Yêu cầu đặt lại mật khẩu</h3>
            <p>Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản Fruitables.</p>
            <p>Mã xác thực của bạn là: <strong style="font-size: 18px; color: #FFB524;">${resetToken}</strong></p>
            <p>Vui lòng nhập mã này vào trang khôi phục mật khẩu.</p>
            <p><i>Mã này sẽ hết hạn sau 1 giờ.</i></p>
            <br/>
            <p>Trân trọng,<br/>Đội ngũ Fruitables</p>
        `;
        
        // Gọi service gửi mail
        await emailService.sendEmail(email, emailSubject, emailContent);

        res.json({ success: true, message: 'Mã khôi phục đã được gửi vào email của bạn.' });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
};

// [POST] /api/auth/reset-password
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const customer = await Customer.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!customer) {
            return res.status(400).json({ success: false, message: 'Mã khôi phục không hợp lệ hoặc đã hết hạn.' });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        customer.password = await bcrypt.hash(newPassword, salt);

        // Xóa token sau khi sử dụng
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpires = undefined;

        await customer.save();

        res.json({ success: true, message: 'Mật khẩu đã được thay đổi thành công! Vui lòng đăng nhập.' });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
    }
};
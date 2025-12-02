const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('../config/passport.config'); 
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_jwt_secret'; 

// QUAN TRỌNG: Đây là địa chỉ của React App (Frontend)
const CLIENT_URL = "http://localhost:5173"; 

// --- Local Authentication Routes ---
router.post('/register', authController.register);
router.post('/login', authController.login);

// --- Social Authentication Routes (Google) ---

// 1. Chuyển hướng đến Google
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 2. Google Callback (xử lý phản hồi)
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: `${CLIENT_URL}/login?error=google_fail`,
        session: false // Tắt session vì ta dùng JWT
    }),
    (req, res) => {
        // Sau khi Passport xác thực thành công, req.user chứa thông tin Customer
        const customer = req.user;
        
        // Tạo JWT cho phiên đăng nhập
        const token = jwt.sign(
            { id: customer._id, email: customer.email, role: 'customer' }, 
            JWT_SECRET, 
            { expiresIn: '1d' }
        );
        
        // QUAN TRỌNG: Chuyển hướng về URL của Client (React Port 5173)
        // Truyền token qua query param để FE bắt được
        res.redirect(`${CLIENT_URL}?token=${token}`);
    }
);

module.exports = router;
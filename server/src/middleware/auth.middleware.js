const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_jwt_secret';

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization']; 
    // Token format: "Bearer <token>"

    if (!token) {
        return res.status(403).json({ success: false, message: 'Không có token, quyền truy cập bị từ chối.' });
    }

    try {
        // Loại bỏ từ khóa 'Bearer ' nếu có
        const bearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        const decoded = jwt.verify(bearer, JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token không hợp lệ.' });
    }
};

module.exports = verifyToken;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('../config/passport.config'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_jwt_secret'; 
const CLIENT_URL = "http://localhost:5173"; 

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: `${CLIENT_URL}/login?error=google_fail`,
        session: false 
    }),
    (req, res) => {
        const customer = req.user;
        const token = jwt.sign(
            { id: customer._id, email: customer.email, role: 'customer' }, 
            JWT_SECRET, 
            { expiresIn: '1d' }
        );
        res.redirect(`${CLIENT_URL}?token=${token}`);
    }
);

module.exports = router;
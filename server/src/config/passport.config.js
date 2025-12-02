const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Customer = require('../models/Customer.model');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// Kiểm tra biến môi trường để tránh lỗi khởi động nếu thiếu
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("CẢNH BÁO: GOOGLE_CLIENT_ID hoặc GOOGLE_CLIENT_SECRET chưa được cấu hình trong file .env");
}

const DEFAULT_PASSWORD = process.env.DEFAULT_SIGNUP_PASSWORD || 'default_secure_password_123456';

// 1. Serialize User: Lưu ID vào session
passport.serializeUser((customer, done) => {
    done(null, customer.id);
});

// 2. Deserialize User: Lấy thông tin Customer từ ID trong session
passport.deserializeUser(async (id, done) => {
    try {
        const customer = await Customer.findById(id);
        done(null, customer);
    } catch (err) {
        done(err, null);
    }
});

// Hàm xử lý logic chung khi nhận được profile từ Google
const handleSocialLogin = async (accessToken, refreshToken, profile, done) => {
    try {
        // Lấy email từ profile Google
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        if (!email) {
            return done(new Error("Không tìm thấy email từ tài khoản Google"), null);
        }

        // Tìm kiếm khách hàng trong DB
        let customer = await Customer.findOne({ email: email });

        if (customer) {
            // Nếu đã tồn tại -> Đăng nhập thành công
            return done(null, customer);
        } else {
            // Nếu chưa tồn tại -> Tạo tài khoản mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, salt);

            const customerName = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;

            // Tạo số điện thoại giả lập để thỏa mãn ràng buộc unique của Schema
            // (Trong thực tế, bạn nên yêu cầu người dùng cập nhật SĐT sau khi đăng nhập)
            const dummyPhone = '000' + Date.now().toString().slice(-7); 

            customer = new Customer({
                customer_name: customerName,
                email: email,
                password: hashedPassword,
                address: "Chưa cập nhật (Đăng nhập qua Google)",
                phone_number: dummyPhone, 
                status: 'active'
            });

            await customer.save();
            return done(null, customer);
        }
    } catch (err) {
        return done(err, null);
    }
};

// 3. Cấu hình Google Strategy
// Lưu ý: Callback URL phải trùng khớp với cấu hình trên Google Cloud Console
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, handleSocialLogin));

module.exports = passport;
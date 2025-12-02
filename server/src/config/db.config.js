const mongoose = require('mongoose');
require('dotenv').config(); // Load biến môi trường

const connectDB = () => {
    // LƯU Ý: Đảm bảo biến môi trường MONGO_URI được thiết lập trong môi trường chạy của bạn
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cosmetic_db';

    mongoose.connect(MONGO_URI)
        .then(() => console.log('Kết nối thành công tới MongoDB.'))
        .catch(err => {
            console.error('LỖI KẾT NỐI MONGODB: Không thể kết nối. Vui lòng kiểm tra MONGO_URI và Server MongoDB', err.message);
            // Dừng ứng dụng nếu không thể kết nối DB
            process.exit(1); 
        });
};

module.exports = connectDB;
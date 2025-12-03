const Product = require('../models/Product.model');

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            category,
            description,
            image,
            price,
            marketPrice,
            countInStock,
            origin,
            ingredients,
            mainPurpose,
            expirationDate
        } = req.body;
        if (!name || !brand || !category || !description || !price || !countInStock || !marketPrice) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Please complete form (Name, Brand, Category, Prices, Stock...)'
            });
        }

        const checkProduct = await Product.findOne({ name: name });
        if (checkProduct) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product name was exist'
            });
        }

        // Slug sẽ được tự động tạo nếu bạn đã cài plugin mongoose-slug-updater
        const newProduct = await Product.create({
            name,
            brand,
            category,
            origin,
            ingredients,
            mainPurpose,
            expirationDate,
            description,
            image, //  mảng các đường link ảnh (Array Strings)
            price,
            marketPrice,
            countInStock
        });

        // Trả về kết quả thành công
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo sản phẩm thành công',
            data: newProduct
        });

    } catch (e) {
        // Xử lý lỗi từ server hoặc lỗi Validate từ Mongoose
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Lỗi server'
        });
    }
};


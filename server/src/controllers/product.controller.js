const Product = require('../models/Product.model');

// [GET] /api/products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// [POST] /api/products/addProduct
exports.createProduct = async (req, res) => {
    try {
        const {
            name, brand, category, description, image, price, 
            marketPrice, countInStock, origin, ingredients, 
            mainPurpose, expirationDate
        } = req.body;

        // Validation cơ bản
        if (!name || !brand || !category || !description || !price || !countInStock || !marketPrice) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Thương hiệu, Danh mục, Giá, Tồn kho...)'
            });
        }

        const checkProduct = await Product.findOne({ name: name });
        if (checkProduct) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Tên sản phẩm đã tồn tại'
            });
        }

        // Tạo sản phẩm mới
        const newProduct = await Product.create({
            name,
            brand,
            category,
            origin,
            ingredients,
            mainPurpose,
            expirationDate,
            description,
            image, // image nên là mảng []
            price,
            marketPrice,
            countInStock
        });

        return res.status(201).json({
            status: 'OK',
            message: 'Tạo sản phẩm thành công',
            data: newProduct
        });

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Lỗi server'
        });
    }
};


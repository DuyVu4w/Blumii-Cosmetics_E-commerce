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

// [POST] /api/products/seed (Cập nhật cho Model mới)
exports.seedProducts = async (req, res) => {
    // Dữ liệu mẫu đã được chuẩn hóa theo Model mới
    const sampleProducts = [
        { 
            name: "Ordinary Serum", 
            brand: "The Ordinary",
            category: "Skincare", 
            description: "Hydrating serum for smooth, healthy skin.", 
            price: 189000, 
            marketPrice: 200000,
            countInStock: 100,
            image: ["img/serum.jpg"]
        },
        { 
            name: "Grapes", 
            brand: "Espoir",
            category: "Makeup", 
            description: "Soft, blendable shades for daily makeup looks.", 
            price: 490000,
            marketPrice: 550000,
            countInStock: 50,
            image: ["img/espoir.jpg"]
        },
        // ... Thêm các sản phẩm khác tương tự
    ];

    try {
        await Product.deleteMany({});
        await Product.insertMany(sampleProducts);
        res.json({ success: true, message: 'Đã nạp dữ liệu mẫu (Schema Mới) thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
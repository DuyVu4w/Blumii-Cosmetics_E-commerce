const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug);
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true
    },
    brand: {
        type: String,
        required: true,
        index: true
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Cleanser', 'Toner', 'Moisturizer', 'Sunscreen', 'Makeup', 'Perfume', 'BodyCare', 'HairCare'] 
    },
    origin: { type: String },
    ingredients: { type: String },
    mainPurpose: { type: String },
    expirationDate: { type: Date },
    description: { type: String, required: true },
    image: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        default: 5.0,
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    marketPrice: {
        type: Number,
        require: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
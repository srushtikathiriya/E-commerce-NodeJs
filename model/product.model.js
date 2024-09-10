const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true },
    category: { 
        type: String, 
        required: true, 
        default: 'Fashion' },
    price: { 
        type: Number, 
        required: true },
    brand: { 
        type: String, 
        required: true },
    size: { 
        type: String, 
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 
        required: true },
    color: { 
        type: String, 
        required: true },
    material: { 
        type: String, 
        required: true },
    stock: { 
        type: Number, 
        default: 0 },
    images: [String],
    thumbnail: { 
        type: String,
         required: true 
        },
    gender: { 
        type: String, 
        enum: ['Men', 'Women', 'Unisex'], 
        required: true },
    occasion: { 
        type: String, 
        enum: ['Casual', 'Formal', 'Sportswear', 'Party'], 
        required: true 
    },
    season: { 
        type: String, 
        enum: ['Summer', 'Winter', 'Spring', 'Autumn'], 
        required: true 
    },
    availabilityStatus: { type: String, default: 'In Stock' }
}, { timestamps: true });


module.exports = mongoose.model('product', productSchema);
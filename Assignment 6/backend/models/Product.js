const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['men', 'women', 'accessories'] },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, default: 10 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

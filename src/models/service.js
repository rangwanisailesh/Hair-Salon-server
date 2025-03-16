const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String },
        price: { type: Number },
        duration: { type: Number },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('services', serviceSchema);
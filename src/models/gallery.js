const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        img: { type: String },
        title: { type: String },
    },
    {
        timestamps: true,
        collection: 'gallery'
    }
);

module.exports = mongoose.model('gallery', gallerySchema);
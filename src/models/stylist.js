const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema(
    {
        name: { type: String },
        img: { type: String },
        email: { type: String },
        phone: { type: String },
        experience: { type: String },
        tag: { type: String },
        desc: { type: String },
        available: { type: Boolean },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('stylists', stylistSchema);
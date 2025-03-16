const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        name: { type: String },
        code: { type: String },
        type: { type: String },
        value: { type: Number },
        active: { type: Boolean },
        validperuser: { type: Boolean },
        expiry: { type: Date },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customers',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('coupons', couponSchema);
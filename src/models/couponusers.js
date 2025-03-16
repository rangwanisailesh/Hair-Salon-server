const mongoose = require('mongoose');

const couponUsersSchema = new mongoose.Schema(
    {
        name: { type: String },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coupon',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('couponusers', couponUsersSchema);
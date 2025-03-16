const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        title: { type: String },
        paymentmode: { type: String },
        payment: { type: String },
        title: { type: String },
        totalamount: { type: Number },
        finalamount: { type: Number },
        extraamount: { type: Number },
        scheduledStart: { type: Date },
        scheduledEnd: { type: Date },
        stylist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'stylist',
            required: true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer',
            required: true
        },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coupon',
        },
        discount: {
            type: Number
        },
        status: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('appointments', appointmentSchema);
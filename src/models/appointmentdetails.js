const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema(
    {
        title: { type: String },
        price: { type: Number },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'appointment',
            required: true
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'service',
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('appointmentdetails', detailsSchema);
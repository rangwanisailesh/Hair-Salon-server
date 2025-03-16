const mongoose = require('mongoose');

const WorkingSchema = new mongoose.Schema(
    {
        stylist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'stylists',
            required: true
        },
        title: { type: String },
        day: { type: Number },
        workingstart: { type: Date },
        workingend: { type: Date },
        extra: { type: Boolean },
        extratype: { type: String },
        extravalue: { type: Number },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('stylistworkings', WorkingSchema);
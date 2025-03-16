const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema(
    {
        stylist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'stylists',
            required: true
        },
        starttime: { type: Date },
        endtime: { type: Date },
        allday: { type: Boolean },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('stylistholidays', HolidaySchema);
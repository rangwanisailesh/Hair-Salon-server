const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String, required: true, unique: true },
    lastlogin: { type: Date },
});

module.exports = mongoose.model('customers', userSchema);
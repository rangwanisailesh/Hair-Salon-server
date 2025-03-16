const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: 'admin' },
});

module.exports = mongoose.model('users', userSchema);
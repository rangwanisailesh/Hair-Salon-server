const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('auths', authSchema);
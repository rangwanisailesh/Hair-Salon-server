const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to normalize phone number
const normalizePhone = (phone) => {
    if (phone.startsWith("+44")) {
        return phone.substring(3); // Remove +44
    }
    return phone;
};

// Auth check
const Check = async (req, res) => {
    try {
        const { phone } = req.body;
        const normalizedPhone = normalizePhone(phone);

        const user = await User.findOne({
            $or: [{ phone: phone }, { phone: `+44${normalizedPhone}` }]
        });
        
        if (!user) {
            return res.json({ error: 'User not registered.' });
        }

        return res.json({ success: 'User already exists with the same number. Please login.' });

    } catch (err) {
        return res.json({ error: 'Server side error - auth check' });
    }
};

// Login
const Login = async (req, res) => {
    try {
        const { phone } = req.body;
        const normalizedPhone = normalizePhone(phone);

        const user = await User.findOne({
            $or: [{ phone: phone }, { phone: `+44${normalizedPhone}` }]
        });

        if (!user) {
            return res.json({ error: 'User not registered.' });
        }

        const date = new Date();
        await User.findOneAndUpdate({ _id: user._id }, { lastlogin: date });

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }, process.env.JWT_SECRET);

        return res.json({ success: 'Login Successful', token: token });

    } catch (err) {
        return res.json({ error: 'Server side error - login' });
    }
};

// register
const Register = async (req, res) => {

    try {

        const { fd } = req.body;

        const user = await User.findOne({ phone: fd.phone });

        if (user) {
            return res.json({ error: 'User already exist with same phone number.' });
        }

        const create = new User(fd);

        await create.save();
        
        const date = new Date();

        await User.findOneAndUpdate({ _id: user._id }, { lastlogin: date });

        const token = jwt.sign({
            id: create._id,
            name: create.name,
            email: create.email,
            phont: create.phone,
        }, process.env.JWT_SECRET);

        return res.json({ success: 'Registeration Successfull', token: token });
    } catch (err) {
        return res.json({ error: 'Server side error - register' });
    }
};

// update
const Update = async (req, res) => {

    try {

        const { fd } = req.body;

        const user = await User.findOneAndUpdate({ _id: fd._id }, fd);

        if (!user) {
            return res.json({ error: 'User not found.' });
        }

        return res.json({ success: 'Details updated successfully.' });
    } catch(err) {
        return res.json({ error: 'Server side error - update' });
    }
};

module.exports = {
    Check,
    Login,
    Register,
    Update
}
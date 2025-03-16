const Auth = require('../models/auth');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const GenerateResetPass = async (req, res) => {

    try {

        const { email } = req.body;

        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.json({ error: 'Admin not registered.' });
        }

        await transporter.sendMail({
            from: `Hairgame Admin Reset (Website) ${process.env.SMTP_USER}`,
            to: email,
            subject: `Reset Password`,
            html: `
            <a href="${process.env.FRONTEND_URL}/resetpass?id=${admin._id}">
                Click here to get reset password link.
            </a>
            `,
        });

        return res.json({ success: 'Reset link has been sent to your mail id.' });
    } catch (err) {
        return res.json({ error: 'Error generating password link' });
    }
};

const ResetPassword = async (req, res) => {

    try {

        const { id, pass } = req.body;

        const admin = await Admin.findOne({ _id: id });

        if (!admin) {
            return res.json({ error: 'Admin not found.' });
        }

        const hashpass = await bcrypt.hash(pass, 10);

        const checkauth = await Auth.findOne({ user: id });

        if (checkauth) {
            const update = await Auth.findOneAndUpdate({ password: hashpass });
            await update.save();
            return res.json({ success: 'Password reset successfully.' });
        }

        const auth = new Auth({
            user: admin._id,
            password: hashpass
        });

        await auth.save();
        return res.json({ success: 'Password reset successfully.' });
    } catch (err) {
        return res.json({ error: 'Server side error - admin password reset' });
    }
};

module.exports = {
    ResetPassword,
    GenerateResetPass
}
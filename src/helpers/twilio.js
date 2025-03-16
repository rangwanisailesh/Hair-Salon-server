const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH);
const express = require('express');
const router = express.Router();

const CreateVerificationOtp = async (req, res) => {
    try {

        const { phone } = req.body;

        const verification = await client.verify.v2
            .services(process.env.TWILIO_VA_SID)
            .verifications.create({
                channel: "sms",
                to: phone,
            });

        if (!verification) {
            return res.json({ error: 'Failed to initiate OTP request. Please try again later.' });
        } else if (verification.status == 'pending') {
            return res.json({ success: 'OTP Sent.' });
        }
    } catch (err) {
        return res.json({ error: 'Internal Server Error while sending otp' });
    }
};

const VerifyOtp = async (req, res) => {

    try {

        const { phone, otp } = req.body;

        const verificationCheck = await client.verify.v2
            .services(process.env.TWILIO_VA_SID)
            .verificationChecks.create({
                code: otp,
                to: phone,
            });

        if (verificationCheck.status == 'pending') {
            return res.json({ error: 'Invalid Otp.' });
        } else if (verificationCheck.status == 'approved') {
            return res.json({ success: 'OTP Verified.' });
        }
    } catch (err) {
        return res.json({ error: 'Internal Server Error while verifying the otp' });
    }
};

const ValidatePhone = async (req, res) => {

    try {

        const { phone } = req.body;

        const lookup = await client.lookups.v2.phoneNumbers(phone).fetch({ type: ["carrier"] });
        
        if (!lookup || !lookup.valid) {
            return res.json({ error: "Invalid phone number." });
        }

        return res.json({ success: true });
    } catch (err) {
        return res.json({ error: 'Internal server error while validating phone number.' });
    }
};

router.post('/create-otp', CreateVerificationOtp);
router.post('/verify-otp', VerifyOtp);
router.post('/validate', ValidatePhone);

module.exports = router;
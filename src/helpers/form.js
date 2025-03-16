const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

router.post('/', async (req, res) => {

    const { formdata } = req.body;

    try {
        await transporter.sendMail({
            from: `Hairgame Contact Query (Website) ${process.env.SMTP_USER}`,
            to: process.env.SMTP_RECEIVER,
            subject: `Contact Form Details`,
            html: `
            <div>
                <h1>Name : ${formdata.name}</h1>
                <h1>Email : ${formdata.email}</h1>
                <h1>Phone : ${formdata.phone}</h1>
                <h1>Subject : ${formdata.sub}</h1>
                <h1>Message : ${formdata.message}</h1>
            </div>
            `,
        });

        res.json({ success: 'Thank you for contacting us. We will reply you soon.' });
    } catch (err) {
        res.json({ error: 'Internal Server Occcured.' });
    }

});

module.exports = router;
const Stripe = require("stripe");
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Services = require('../models/service');
const Appointment = require('../models/appointment');

const stripe = new Stripe(process.env.STRIPE_SECRET);

router.post('/create-checkout', async (req, res) => {
    try {
        const { services, coupon, data, extra } = req.body;
        let couponid = null;
        let discountamount = 0;

        const serviceIds = services.map(s => s);
        const serviceDetails = await Services.find({ _id: { $in: serviceIds } });

        const token = jwt.sign(data, process.env.JWT_SECRET);

        let line_items = serviceDetails.map(item => ({
            price_data: {
                currency: "gbp",
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
        }));

        if (coupon && coupon.value) {
            const totalServicePrice = serviceDetails.reduce((sum, item) => sum + item.price, 0);

            discountamount = coupon.type === "Percentage"
                ? (totalServicePrice * coupon.value) / 100
                : coupon.value;

            const stripeCoupon = await stripe.coupons.create({
                name: coupon.name,
                duration: "once",
                amount_off: Math.round(discountamount * 100),
                currency: "gbp",
            });

            couponid = stripeCoupon.id;
        }

        if (extra) {
            line_items.push({
                price_data: {
                    currency: "gbp",
                    product_data: { name: `Extra Hour` },
                    unit_amount: Math.round(extra * 100),
                },
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            discounts: couponid ? [{ coupon: couponid }] : [],
            success_url: `${process.env.FRONTEND_URL}/book-appointment?data=${token}&sessionid={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/book-appointment?data=${token}`,
        });

        return res.json({ success: session.url });

    } catch (err) {
        return res.json({ error: 'Server side error - checkout' });
    }
});


router.post("/verify-payment", async (req, res) => {
    try {
        const { sessionid } = req.body;

        if (!sessionid) {
            return res.json({ error: "Session ID is required" });
        }

        const CheckAppointmnt = await Appointment.findOne({ payment: sessionid });

        if (CheckAppointmnt) {
            return res.json({ error: 'Please book new appointment. This appointment already booked previously.' })
        }

        const session = await stripe.checkout.sessions.retrieve(sessionid);

        if (session.payment_status === "paid") {
            return res.json({ success: 'Payment Completed' });
        } else {
            return res.json({ error: "Payment not completed" });
        }
    } catch (err) {
        return res.json({ error: "Error retrieving session", details: err.message });
    }
});

module.exports = router;
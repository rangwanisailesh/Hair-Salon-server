const Coupon = require('../models/coupons');
const Appointment = require('../models/appointment');
const User = require('../models/user');

// Get all Coupons
const AllCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.find();

        return res.json({ success: coupons });
    } catch (err) {
        return res.json({ error: 'Server side error - fetching gallery' });
    }
};

// Check Coupon
const CheckCoupon = async (req, res) => {

    try {

        const date = new Date();

        const { couponcode } = req.body;

        const findCoupon = await Coupon.findOne({ code: { $regex: `^${couponcode}$`, $options: "i" } });

        if (!findCoupon || findCoupon.active == false || (findCoupon.expiry && new Date(findCoupon.expiry) < date)) {
            return res.json({ error: 'Coupon is invalid or expired.' });
        }

        return res.json({ success: findCoupon });
    } catch (err) {
        return res.json({ error: 'Server side error - coupon' });
    }
};

// Coupon User check
const ValidateUser = async (req, res) => {

    try {

        const date = new Date();

        const { coupon, user } = req.body;

        const findCoupon = await Coupon.findOne({ _id: coupon });

        if (!findCoupon || findCoupon.active == false || (findCoupon.expiry && new Date(findCoupon.expiry) < date)) {
            return res.json({ error: 'Coupon is invalid or expired.' });
        }

        if (findCoupon.validperuser) {

            const check = await Appointment.findOne({ customer: user, coupon: findCoupon });

            if (check) {
                return res.json({ error: 'You have already used this coupon.' });
            }
        }

        if (findCoupon.customer) {

            const check = await Appointment.findOne({ customer: user, coupon: findCoupon });
            if (check) {
                return res.json({ error: 'You have already used this coupon.' });
            }

            if (findCoupon.customer.toString() !== user) {
                return res.json({ error: 'Coupon is not for you.' });
            }
        }

        return res.json({ success: findCoupon });
    } catch (err) {
        return res.json({ error: 'Server side error - coupon validate' });
    }
};

// Cancel Coupon
const CancelCoupon = async (req, res) => {

    try {

        const { appointmentid, userid } = req.body;

        const appoint = await Appointment.findOne({ _id: appointmentid });

        if (appoint.paymentmode == 'Online') {

            const formatDate = (isoString) => {
                const date = new Date(isoString);

                const day = String(date.getUTCDate()).padStart(2, "0");
                const month = String(date.getUTCMonth() + 1).padStart(2, "0");
                const year = String(date.getUTCFullYear()).slice(-2);

                let hours = date.getUTCHours();
                const minutes = String(date.getUTCMinutes()).padStart(2, "0");
                const ampm = hours >= 12 ? "PM" : "AM";

                hours = hours % 12 || 12;

                return `${day}${month}${year}`;
            };

            const user = await User.findOne({ _id: userid });

            const createdcode = `${user.name.split(" ")[0].toUpperCase()}${formatDate(appoint.scheduledStart)}`;
            let isDuplicate = true;

            while (isDuplicate) {
                const existingCoupon = await Coupon.findOne({ code: createdcode });
                if (!existingCoupon) {
                    isDuplicate = false;
                } else {
                    const randomDigits = Math.floor(10 + Math.random() * 90);
                    createdcode = `${user.name.split(" ")[0].toUpperCase()}${formatDate(appoint.scheduledStart)}${randomDigits}`;
                }
            }
            const scheduledDate = new Date(appoint.scheduledStart);

            const createCoupon = new Coupon({
                name: user.name,
                code: createdcode,
                type: 'Price',
                value: appoint.finalamount,
                active: true,
                validperuser: true,
                expiry: scheduledDate.setMonth(scheduledDate.getMonth() + 6),
                customer: user._id
            });

            await createCoupon.save();

            const appointupdate = await Appointment.findOneAndUpdate({ _id: appoint._id }, { status: 'cancelled' });
            await appointupdate.save();

            return res.json({ success: 'Coupon credited in your account & appointment cancelled successfully.' });
        } else if(appoint.paymentmode) {

            const appointupdate = await Appointment.findOneAndUpdate({ _id: appointmentid }, { status: 'cancelled' });

            await appointupdate.save();

            return res.json({ success: 'Appointment cancelled successfully.' });
        }
    } catch (err) {
        return res.json({ error: 'Server side error - creating coupon' });
    }
};

module.exports = {
    AllCoupons,
    ValidateUser,
    CheckCoupon,
    CancelCoupon
}
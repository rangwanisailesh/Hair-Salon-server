const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('../src/helpers/db');

app.use(express.json({ strict: false }));
app.use(cors({ origin: '*' }));

const User = require('../src/routes/user');
const Stylist = require('../src/routes/stylist');
const Service = require('../src/routes/service');
const Gallery = require('../src/routes/gallery');
const Coupon = require('../src/routes/coupon');
const Appointment = require('../src/routes/appointment');
const Admin = require('../src/routes/admin');

const Twilio = require('../src/helpers/twilio');
const Stripe = require('../src/helpers/stripe');
const Contact = require('../src/helpers/form');

app.use('/user', User);
app.use('/stylist', Stylist);
app.use('/service', Service);
app.use('/gallery', Gallery);
app.use('/coupon', Coupon);
app.use('/appointment', Appointment);
app.use('/twilio', Twilio);
app.use('/stripe', Stripe);
app.use('/contact', Contact);
app.use('/admin', Admin);

app.get('/', (req, res) => {
    res.send('Hairgame server active');
});

export default app; //for vercel
// app.listen(5000, () => console.log('Hairgame server running'));
const express = require('express');
const router = express.Router();
const {
    AllStylist,
    StylistWorkings,
    StylistHolidays
} = require('../controllers/stylist');

router.get('/all', AllStylist);
router.post('/workings', StylistWorkings);
router.post('/holidays', StylistHolidays);

module.exports = router;
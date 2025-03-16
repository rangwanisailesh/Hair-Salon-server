const Stylist = require('../models/stylist');
const Working = require('../models/stylistworking');
const Holiday = require('../models/stylistholiday');

// Get all Stylist
const AllStylist = async (req, res) => {

    try {

        const stylists = await Stylist.find();

        return res.json({ success: stylists });
    } catch(err) {
        return res.json({ error: 'Server side error - fetching stylists' });
    }
};

// Get Stylist working
const StylistWorkings = async (req, res) => {

    try {

        const { stylistid } = req.body;

        const workings = await Working.find({ stylist: stylistid });

        return res.json({ success: workings });
    } catch(err) {
        return res.json({ error: 'Server side error - fetching workings' });
    }
};

// Get stylist holidays
const StylistHolidays = async (req, res) => {
    
    try {

        const { stylistid } = req.body;

        const holidays = await Holiday.find({ stylist: stylistid });

        return res.json({ success: holidays });
    } catch(err) {
        return res.json({ error: 'Server side error - fetching holidays' });
    }
};

module.exports = {
    AllStylist,
    StylistWorkings,
    StylistHolidays
}
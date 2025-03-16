const Service = require('../models/service');

// Get all Service
const AllServices = async (req, res) => {

    try {

        const services = await Service.find();

        return res.json({ success: services });
    } catch(err) {
        return res.json({ error: 'Server side error - fetching services' });
    }
};

module.exports = {
    AllServices
}
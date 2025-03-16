const Appointment = require('../models/appointment');
const Details = require('../models/appointmentdetails');
const Services = require('../models/service');

// create
const CreateAppointment = async (req, res) => {
    try {
        let { appointment } = req.body;

        if (!appointment.coupon || appointment.coupon === "") {
            appointment.coupon = null;
        }

        const serviceIds = appointment.services.map(s => s);
        const serviceDetails = await Services.find({ _id: { $in: serviceIds } });

        const appoint = new Appointment({
            ...appointment,
            services: serviceDetails
        });

        await appoint.save();

        const details = serviceDetails.map(service => ({
            appointment: appoint._id,
            title: service.name,
            price: service.price,
            service: service._id
        }));

        await Details.insertMany(details);

        return res.json({ success: 'Appointment Created Successfully.' });
    } catch (err) {
        return res.json({ error: 'Server side error - creating appointment' });
    }
};


// user appointments
const UserAppointments = async (req, res) => {

    try {

        const { userid } = req.body;

        const appointments = await Appointment.find({ customer: userid });

        return res.json({ success: appointments });
    } catch (err) {
        return res.json({ error: 'Server side error - fetching appointments' });
    }
};

// all appointments
const AllAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find();

        return res.json({ success: appointments });
    } catch (err) {
        return res.json({ error: 'Server side error - fetching appointments' });
    }
};

// details
const AppointmentDetails = async (req, res) => {

    try {

        const { appointmentid } = req.body;

        const details = await Details.find({ appointment: appointmentid });

        return res.json({ success: details });
    } catch (err) {
        return res.json({ error: 'Server side error - fetching details' });
    }
};

// Stylist Appointments
const StylistAppointments = async (req, res) => {

    try {

        const { stylistid } = req.body;

        const appoints = await Appointment.find({ stylist: stylistid });

        return res.json({ success: appoints });
    } catch(err) {
        return res.json({ error: 'Server side error - stylist appointments' });
    }
};

module.exports = {
    AllAppointments,
    CreateAppointment,
    AppointmentDetails,
    UserAppointments,
    StylistAppointments
}
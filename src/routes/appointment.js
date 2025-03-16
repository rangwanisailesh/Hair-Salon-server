const express = require('express');
const router = express.Router();
const {
    AllAppointments,
    CreateAppointment,
    AppointmentDetails,
    UserAppointments,
    StylistAppointments
} = require('../controllers/appointment');

router.get('/all', AllAppointments);
router.post('/user', UserAppointments);
router.post('/create', CreateAppointment);
router.post('/details', AppointmentDetails);
router.post('/stylist', StylistAppointments);

module.exports = router;
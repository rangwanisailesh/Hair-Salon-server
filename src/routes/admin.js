const express = require('express');
const router = express.Router();
const {
    ResetPassword,
    GenerateResetPass
} = require('../controllers/admin');

router.post('/resetpass', ResetPassword);
router.post('/generateresetpass', GenerateResetPass);

module.exports = router;
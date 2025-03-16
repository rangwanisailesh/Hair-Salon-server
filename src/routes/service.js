const express = require('express');
const router = express.Router();
const {
    AllServices
} = require('../controllers/service');

router.get('/all', AllServices);

module.exports = router;
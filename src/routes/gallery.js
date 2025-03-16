const express = require('express');
const router = express.Router();
const {
    AllImages
} = require('../controllers/gallery');

router.get('/all', AllImages);

module.exports = router;
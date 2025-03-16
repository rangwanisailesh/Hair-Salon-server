const express = require('express');
const router = express.Router();
const {
    Check,
    Login,
    Register,
    Update
} = require('../controllers/user');

router.post('/check', Check);
router.post('/login', Login);
router.post('/register', Register);
router.post('/update', Update);

module.exports = router;
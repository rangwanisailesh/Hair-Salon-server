const express = require('express');
const router = express.Router();
const {
    AllCoupons,
    ValidateUser,
    CheckCoupon,
    CancelCoupon
} = require('../controllers/coupon');

router.get('/all', AllCoupons);
router.post('/validate', ValidateUser);
router.post('/check', CheckCoupon);
router.post('/cancel', CancelCoupon);

module.exports = router;
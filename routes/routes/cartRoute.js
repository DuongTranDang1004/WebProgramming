const express = require('express');
const router = express.Router();
const { purchaseCart } = require('../controllers/cartController'); // Assuming you created this controller file

// POST /cart/purchase - Purchase courses from cart
router.post('/purchase', purchaseCart);

module.exports = router;

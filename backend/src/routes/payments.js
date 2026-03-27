const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

// Protected routes
router.use(verifyToken);

// Create payments
router.post('/ticket', paymentController.createTicketPayment);
router.post('/checkout', paymentController.createCheckoutPayment);

// Get payment status
router.get('/status/:orderNumber', paymentController.getPaymentStatus);

// PayFast ITN (Instant Transaction Notification) - No auth required
router.post('/notify', express.urlencoded({ extended: true }), paymentController.handlePaymentNotification);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Dashboard
router.get('/dashboard', userController.getDashboardData);

// Tickets
router.get('/tickets', userController.getMyTickets);

// Transactions
router.get('/transactions', userController.getMyTransactions);

// Orders
router.get('/orders', userController.getMyOrders);

// Referrals
router.get('/referrals', userController.getMyReferrals);

// Notifications
router.put('/notifications/:notificationId/read', userController.markNotificationRead);
router.put('/notifications/read-all', userController.markAllNotificationsRead);

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireRole } = require('../middleware/auth');

// All routes require admin role
router.use(verifyToken);
router.use(requireRole('admin'));

// Dashboard stats
router.get('/dashboard-stats', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:userId/approve', adminController.approveUser);
router.put('/users/:userId/suspend', adminController.suspendUser);

// Transactions
router.get('/transactions', adminController.getAllTransactions);

// Orders
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);

module.exports = router;

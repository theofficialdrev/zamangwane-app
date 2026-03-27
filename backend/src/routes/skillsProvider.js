const express = require('express');
const router = express.Router();
const skillsProviderController = require('../controllers/skillsProviderController');
const { verifyToken, requireRole } = require('../middleware/auth');

// All routes require skills_provider role
router.use(verifyToken);
router.use(requireRole('skills_provider'));

// Dashboard stats
router.get('/dashboard-stats', skillsProviderController.getDashboardStats);

// Product management
router.get('/products', skillsProviderController.getMyProducts);
router.post('/products', skillsProviderController.createProduct);
router.put('/products/:productId', skillsProviderController.updateProduct);
router.delete('/products/:productId', skillsProviderController.deleteProduct);
router.get('/products/:productId/sales', skillsProviderController.getProductSales);

// Categories
router.get('/categories', skillsProviderController.getCategories);

module.exports = router;

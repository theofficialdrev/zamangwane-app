const express = require('express');
const router = express.Router();
const eventCoordinatorController = require('../controllers/eventCoordinatorController');
const { verifyToken, requireRole } = require('../middleware/auth');

// All routes require event_coordinator role
router.use(verifyToken);
router.use(requireRole('event_coordinator'));

// Dashboard stats
router.get('/dashboard-stats', eventCoordinatorController.getDashboardStats);

// Event management
router.get('/events', eventCoordinatorController.getMyEvents);
router.post('/events', eventCoordinatorController.createEvent);
router.put('/events/:eventId', eventCoordinatorController.updateEvent);
router.delete('/events/:eventId', eventCoordinatorController.deleteEvent);
router.put('/events/:eventId/cancel', eventCoordinatorController.cancelEvent);

// Event details and tickets
router.get('/events/:eventId', eventCoordinatorController.getEventDetails);
router.get('/events/:eventId/tickets', eventCoordinatorController.getTicketSales);

module.exports = router;

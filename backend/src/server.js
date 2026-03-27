const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payments');
const skillsProviderRoutes = require('./routes/skillsProvider');
const eventCoordinatorRoutes = require('./routes/eventCoordinator');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/skills-provider', skillsProviderRoutes);
app.use('/api/event-coordinator', eventCoordinatorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDB();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   Zamangwane Foundation API Server                         ║
║                                                            ║
║   Running on port: ${PORT}                                ║
║   Environment: ${process.env.NODE_ENV || 'development'}                           ║
║                                                            ║
║   Endpoints:                                               ║
║   - Health:           http://localhost:${PORT}/api/health              ║
║   - Auth:             http://localhost:${PORT}/api/auth                ║
║   - Admin:            http://localhost:${PORT}/api/admin               ║
║   - User:             http://localhost:${PORT}/api/user                ║
║   - Payments:         http://localhost:${PORT}/api/payments            ║
║   - Skills Provider:  http://localhost:${PORT}/api/skills-provider     ║
║   - Event Coordinator: http://localhost:${PORT}/api/event-coordinator  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

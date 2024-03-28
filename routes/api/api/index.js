const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Routes for /api/users and /api/thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
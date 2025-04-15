const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
const buildingRoutes = require('./buildingRoutes');
const userRoutes = require('./userRoutes');

router.use('/tasks', taskRoutes);
router.use('/buildings', buildingRoutes);
router.use('/users', userRoutes);

module.exports = router;

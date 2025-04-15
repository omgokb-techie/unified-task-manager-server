const express = require('express');
const { createTask, updateTaskStatus, getTasks } = require('../controllers/taskController');

const router = express.Router();

// Create a new task
router.post('/', createTask);

// Update task status
router.patch('/:id/status', updateTaskStatus);

// List tasks with optional filters
router.get('/', getTasks);

module.exports = router;

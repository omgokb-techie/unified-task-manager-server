const Task = require('../models/taskModel');
const { Op } = require('sequelize');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, userId, status, dueDate, buildingId } = req.body;
        const task = await Task.create({ title, userId, status, dueDate, buildingId });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error creating task' });
    }
};

// Update Task Status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.update({ status }, { where: { id } });
        if (task[0]) {
            res.status(200).json({ message: 'Task updated' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error updating task' });
    }
};

// Get Tasks
exports.getTasks = async (req, res) => {
    try {
        const { buildingId, userId } = req.query;
        const queryOptions = {
            order: [['dueDate', 'ASC']]
        };

        // Only add where clause if filters are provided
        if (buildingId || userId) {
            queryOptions.where = {};
            if (buildingId) queryOptions.where.buildingId = buildingId;
            if (userId) queryOptions.where.userId = userId;
        }

        const tasks = await Task.findAll(queryOptions);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

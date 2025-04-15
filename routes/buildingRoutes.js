const express = require('express');
const router = express.Router();
const { Building } = require('../models');

// Get all buildings
router.get('/', async (req, res) => {
    try {
        const buildings = await Building.findAll();
        res.json(buildings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { addCompatibilityRule } = require('../controllers/ruleController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, requireAdmin, addCompatibilityRule);

module.exports = router;

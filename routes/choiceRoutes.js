const express = require('express');
const router = express.Router();
const {
  addChoice,
  getChoicesForCategory,
  validateAndCalculate,
} = require('../controllers/choiceController');

const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, addChoice);
router.post('/get-compatible', verifyToken, getChoicesForCategory);
router.post('/validate-calculate', verifyToken, validateAndCalculate);

module.exports = router;

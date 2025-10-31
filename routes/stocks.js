const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const Stock = require('../models/Stock');

// Validation and sanitization middleware
const validateStock = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Stock ticker cannot be empty.')
    .isString()
    .withMessage('Stock ticker must be a string.')
    .isLength({ min: 1, max: 5 })
    .withMessage('Stock ticker must be 1-5 characters.')
    .matches(/^[A-Z]{1,5}$/)
    .withMessage('Stock ticker must be 1-5 uppercase letters.')
    // Custom sanitizer to prevent NoSQL injection
    .customSanitizer((value) => {
      if (typeof value !== 'string') return '';
      // Remove any characters that could be part of a MongoDB operator
      return value.replace(/[$.]/g, '');
    }),
];

/**
 * @route   POST /api/add
 * @desc    Add a stock to the watchlist
 * @access  Public
 */
router.post('/add', validateStock, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }

  // Sanitize final input just in case
  const sanitizedName = sanitizeHtml(req.body.name, { allowedTags: [], allowedAttributes: {} });
  if(sanitizedName !== req.body.name.toUpperCase()) {
      return res.status(400).json({ success: false, error: 'Invalid characters in ticker.' });
  }

  try {
    const newStock = new Stock({ name: sanitizedName });
    const savedStock = await newStock.save();
    res.status(201).json({ success: true, data: savedStock });
  } catch (err) {
    // Let the centralized error handler manage it
    next(err);
  }
});

/**
 * @route   GET /api/watchlist
 * @desc    Get all stocks from the watchlist
 * @access  Public
 */
router.get('/watchlist', async (req, res, next) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json({ success: true, data: stocks });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

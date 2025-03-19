
const express = require('express');
const router = express.Router();
const { getAllNews, getNewsByLocation, getNewsById, getNewsByCategory } = require('../controllers/newsController');

// Get all news articles
router.get('/', getAllNews);

// Get news by location
router.get('/location/:location', getNewsByLocation);

// Get news by ID
router.get('/:id', getNewsById);

// Get news by category
router.get('/category/:category', getNewsByCategory);

module.exports = router;

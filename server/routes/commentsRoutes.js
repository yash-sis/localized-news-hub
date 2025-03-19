
const express = require('express');
const router = express.Router();
const { 
  getCommentsByArticleId, 
  addComment, 
  likeComment, 
  dislikeComment 
} = require('../controllers/commentsController');

// Get all comments for an article
router.get('/article/:articleId', getCommentsByArticleId);

// Add a new comment
router.post('/', addComment);

// Like a comment
router.post('/:commentId/like', likeComment);

// Dislike a comment
router.post('/:commentId/dislike', dislikeComment);

module.exports = router;

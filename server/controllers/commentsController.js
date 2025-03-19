
// In-memory database for development
// In a real application, you would use a proper database
let comments = [
  {
    id: '1',
    articleId: '1',
    username: 'JaneDoe',
    content: 'This is great reporting! I was just at this location yesterday.',
    timestamp: '2023-09-15T10:00:00Z',
    likes: 5,
    dislikes: 1,
  },
  {
    id: '2',
    articleId: '1',
    username: 'LocalResident',
    content: 'I appreciate the balanced coverage on this issue.',
    timestamp: '2023-09-15T09:00:00Z',
    likes: 12,
    dislikes: 0,
  }
];

// Get all comments for a specific article
exports.getCommentsByArticleId = (req, res) => {
  const articleId = req.params.articleId;
  const articleComments = comments.filter(comment => comment.articleId === articleId);
  res.json(articleComments);
};

// Add a new comment
exports.addComment = (req, res) => {
  const { articleId, username, content } = req.body;
  
  if (!articleId || !username || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const newComment = {
    id: Date.now().toString(),
    articleId,
    username,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    dislikes: 0
  };
  
  comments.push(newComment);
  res.status(201).json(newComment);
};

// Like a comment
exports.likeComment = (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find(c => c.id === commentId);
  
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  
  comment.likes += 1;
  res.json(comment);
};

// Dislike a comment
exports.dislikeComment = (req, res) => {
  const commentId = req.params.commentId;
  const comment = comments.find(c => c.id === commentId);
  
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  
  comment.dislikes += 1;
  res.json(comment);
};

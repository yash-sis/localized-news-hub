
// In-memory database for development
// In a real application, you would use a proper database
const newsArticles = require('../data/mockNews');

// Get all news articles
exports.getAllNews = (req, res) => {
  res.json(newsArticles);
};

// Get news by location
exports.getNewsByLocation = (req, res) => {
  const location = req.params.location;
  const locationCity = location.split(',')[0].trim().toLowerCase();
  
  const filteredArticles = newsArticles.filter(article => 
    article.location.toLowerCase().includes(locationCity)
  );
  
  res.json(filteredArticles.length > 0 ? filteredArticles : newsArticles);
};

// Get news by ID
exports.getNewsById = (req, res) => {
  const article = newsArticles.find(article => article.id === req.params.id);
  
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
};

// Get news by category
exports.getNewsByCategory = (req, res) => {
  const category = req.params.category.toLowerCase();
  const filteredArticles = newsArticles.filter(
    article => article.category.toLowerCase() === category
  );
  
  res.json(filteredArticles);
};


const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Import route files
const newsRoutes = require('./routes/newsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentsRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'LocalizeNews API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// News API services
export const newsService = {
  // Get all news articles
  getAll: async () => {
    const response = await api.get('/news');
    return response.data;
  },
  
  // Get news by location
  getByLocation: async (location: string) => {
    const response = await api.get(`/news/location/${encodeURIComponent(location)}`);
    return response.data;
  },
  
  // Get news by ID
  getById: async (id: string) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
  
  // Get news by category
  getByCategory: async (category: string) => {
    const response = await api.get(`/news/category/${encodeURIComponent(category)}`);
    return response.data;
  }
};

// Comments API services
export const commentsService = {
  // Get comments for an article
  getByArticleId: async (articleId: string) => {
    const response = await api.get(`/comments/article/${articleId}`);
    return response.data;
  },
  
  // Add a new comment
  addComment: async (articleId: string, username: string, content: string) => {
    const response = await api.post('/comments', { articleId, username, content });
    return response.data;
  },
  
  // Like a comment
  likeComment: async (commentId: string) => {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  },
  
  // Dislike a comment
  dislikeComment: async (commentId: string) => {
    const response = await api.post(`/comments/${commentId}/dislike`);
    return response.data;
  }
};

export default { newsService, commentsService };

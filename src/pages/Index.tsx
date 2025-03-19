import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsFeed from '@/components/news/NewsFeed';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategories from '@/components/news/NewsCategories';
import NewsSourcesSection from '@/components/news/NewsSourcesSection';
import LocationSelector from '@/components/news/LocationSelector';
import { NewsArticle } from '@/components/news/NewsCard';
import { newsService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch all articles on initial load
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const data = await newsService.getAll();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: 'Error',
          description: 'Failed to load news articles. Please try again later.',
          variant: 'destructive',
        });
        // Fallback to empty array if API fails
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, [toast]);
  
  // Fetch articles by location when selected location changes
  useEffect(() => {
    const fetchArticlesByLocation = async () => {
      try {
        setIsLoading(true);
        // Extract just the city name for the API call
        const locationCity = selectedLocation.split(',')[0].trim();
        const data = await newsService.getByLocation(locationCity);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching news by location:', error);
        toast({
          title: 'Error',
          description: `Failed to load news for ${selectedLocation}. Please try again.`,
          variant: 'destructive',
        });
        // Keep the current articles if API fails
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticlesByLocation();
  }, [selectedLocation, toast]);
  
  // Get the first article for the featured section
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  
  // Get the rest of the articles for the news feed
  const latestArticles = articles.length > 0 ? articles.slice(1) : [];
  
  return (
    <>
      <Helmet>
        <title>LocalizeNews - News from your local journalists and newspapers</title>
        <meta name="description" content="Stay informed with news collected directly from local newspapers, journalists and reporters in your community." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-16">
          {/* Location selector */}
          <div className="container mt-4">
            <div className="flex justify-end mb-2">
              <LocationSelector 
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
              />
            </div>
          </div>
          
          {featuredArticle && <FeaturedNews article={featuredArticle} />}
          
          <NewsSourcesSection />
          
          <NewsCategories />
          
          <NewsFeed 
            articles={latestArticles} 
            title={`Latest From ${selectedLocation}`}
            description="Stories gathered from your community's trusted newspapers and journalists"
            isLoading={isLoading}
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

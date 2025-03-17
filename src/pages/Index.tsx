
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { mockNewsArticles } from '@/data/mockNews';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsFeed from '@/components/news/NewsFeed';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategories from '@/components/news/NewsCategories';
import NewsSourcesSection from '@/components/news/NewsSourcesSection';
import LocationSelector from '@/components/news/LocationSelector';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');
  const [filteredArticles, setFilteredArticles] = useState(mockNewsArticles);
  
  // Filter articles by selected location when it changes
  useEffect(() => {
    // Extract just the city name for comparison (before the comma if exists)
    const locationCity = selectedLocation.split(',')[0].trim();
    
    // Filter articles that match the selected location
    const articlesForLocation = mockNewsArticles.filter(article => 
      article.location.includes(locationCity)
    );
    
    setFilteredArticles(articlesForLocation.length > 0 ? articlesForLocation : mockNewsArticles);
  }, [selectedLocation]);
  
  // Get the first article for the featured section
  const featuredArticle = filteredArticles[0];
  
  // Get the rest of the articles for the news feed
  const latestArticles = filteredArticles.slice(1);
  
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
          
          <FeaturedNews article={featuredArticle} />
          
          <NewsSourcesSection />
          
          <NewsCategories />
          
          <NewsFeed 
            articles={latestArticles} 
            title={`Latest From ${selectedLocation}`}
            description="Stories gathered from your community's trusted newspapers and journalists" 
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

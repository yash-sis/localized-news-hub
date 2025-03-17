
import { Helmet } from 'react-helmet';
import { mockNewsArticles } from '@/data/mockNews';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsFeed from '@/components/news/NewsFeed';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategories from '@/components/news/NewsCategories';

const Index = () => {
  // Get the first article for the featured section
  const featuredArticle = mockNewsArticles[0];
  
  // Get the rest of the articles for the news feed
  const latestArticles = mockNewsArticles.slice(1);
  
  return (
    <>
      <Helmet>
        <title>LocalizeNews - Stay informed about your neighborhood</title>
        <meta name="description" content="Get personalized, location-specific news about your community and the issues that matter to you." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <FeaturedNews article={featuredArticle} />
          
          <NewsCategories />
          
          <NewsFeed 
            articles={latestArticles} 
            title="Latest News" 
            description="Stay informed with the latest stories from your area" 
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

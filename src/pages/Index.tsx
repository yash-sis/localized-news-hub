
import { Helmet } from 'react-helmet';
import { mockNewsArticles } from '@/data/mockNews';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NewsFeed from '@/components/news/NewsFeed';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategories from '@/components/news/NewsCategories';
import NewsSourcesSection from '@/components/news/NewsSourcesSection';

const Index = () => {
  // Get the first article for the featured section
  const featuredArticle = mockNewsArticles[0];
  
  // Get the rest of the articles for the news feed
  const latestArticles = mockNewsArticles.slice(1);
  
  return (
    <>
      <Helmet>
        <title>LocalizeNews - News from your local journalists and newspapers</title>
        <meta name="description" content="Stay informed with news collected directly from local newspapers, journalists and reporters in your community." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <FeaturedNews article={featuredArticle} />
          
          <NewsSourcesSection />
          
          <NewsCategories />
          
          <NewsFeed 
            articles={latestArticles} 
            title="Latest From Local Sources" 
            description="Stories gathered from your community's trusted newspapers and journalists" 
          />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

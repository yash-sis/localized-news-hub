
import { useState } from 'react';
import { NewsCard, NewsArticle } from '@/components/news/NewsCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NewsFeedProps {
  articles: NewsArticle[];
  title?: string;
  description?: string;
}

export function NewsFeed({ 
  articles, 
  title = "Latest News", 
  description 
}: NewsFeedProps) {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get unique categories from articles
  const categories = ['All', ...new Set(articles.map(article => article.category))];
  
  // Filter articles by active category
  const filteredArticles = activeCategory && activeCategory !== 'All'
    ? articles.filter(article => article.category === activeCategory)
    : articles;

  return (
    <section className="py-10">
      {title && (
        <div className="container mb-8">
          <h2 className="section-title">{title}</h2>
          {description && (
            <p className="section-description">{description}</p>
          )}
        </div>
      )}
      
      <div className="container mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category === 'All' ? null : category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={article.id}
              className={`${index === 0 && !isMobile ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <NewsCard 
                article={article} 
                variant={index === 0 && !isMobile ? 'featured' : 'default'} 
              />
            </div>
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground">No articles found for this category.</p>
            <Button 
              variant="link" 
              onClick={() => setActiveCategory(null)}
              className="mt-2"
            >
              View all articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsFeed;

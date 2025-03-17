
import { Button } from '@/components/ui/button';
import { NewsArticle } from '@/components/news/NewsCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedNewsProps {
  article: NewsArticle;
}

export function FeaturedNews({ article }: FeaturedNewsProps) {
  const { title, summary, imageUrl, category, publishedAt, location, slug } = article;
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="relative w-full max-h-[500px] overflow-hidden mb-10">
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <div className="container relative z-10 flex flex-col justify-end min-h-[500px] pt-40 pb-16">
        <div className="animate-slide-up max-w-3xl">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-balance">
            {title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            {summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span>{location}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>
            
            <Button asChild>
              <Link to={`/news/${slug}`}>
                Read full story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedNews;

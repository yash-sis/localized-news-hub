
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, User, Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mockNewsSources } from '@/data/mockNews';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  location: string;
  source: string;
  sourceId?: string;
  slug: string;
}

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function NewsCard({
  article,
  variant = 'default',
  className,
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { title, summary, imageUrl, category, publishedAt, location, source, sourceId, slug } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  
  // Find the source details if sourceId is provided
  const sourceDetails = sourceId ? 
    mockNewsSources.find(s => s.id === sourceId) : 
    null;
  
  // Choose icon based on source type
  const getSourceIcon = () => {
    if (!sourceDetails) return <User className="h-3 w-3 mr-1" />;
    
    switch (sourceDetails.type) {
      case 'newspaper':
        return <Newspaper className="h-3 w-3 mr-1" />;
      case 'journalist':
        return <User className="h-3 w-3 mr-1" />;
      default:
        return <User className="h-3 w-3 mr-1" />;
    }
  };
  
  return (
    <Link 
      to={`/news/${slug}`} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all border-transparent",
          isHovered && "shadow-md border-border",
          className
        )}
      >
        <div className={cn(
          "relative overflow-hidden",
          isFeatured && "aspect-[16/9]",
          isCompact && "aspect-[3/2]",
          !isFeatured && !isCompact && "aspect-[4/3]"
        )}>
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-in-out",
              isHovered && "scale-105"
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3">
            <div className="px-2.5 py-1.5 text-xs font-medium bg-white/90 text-foreground rounded-full">
              {category}
            </div>
          </div>
          
          {sourceDetails?.verified && (
            <div className="absolute top-3 right-3">
              <div className="px-2.5 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full flex items-center">
                <span className="mr-1">✓</span> Verified Source
              </div>
            </div>
          )}
        </div>

        <CardContent className={cn(
          "space-y-2.5",
          isFeatured ? "p-5" : "p-4"
        )}>
          <div className="space-y-1.5">
            <h3 className={cn(
              "font-medium line-clamp-2 leading-tight group-hover:text-primary transition-colors",
              isFeatured ? "text-2xl" : "text-lg"
            )}>
              {title}
            </h3>
            
            {!isCompact && (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {summary}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              {getSourceIcon()}
              <span className="font-medium">{source}</span>
              {sourceDetails?.verified && <span className="ml-1 text-primary">✓</span>}
            </div>
            
            <div className="flex justify-between">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {isFeatured && (
            <div className={cn(
              "mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity",
              isHovered && "opacity-100"
            )}>
              <span>Read article</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default NewsCard;

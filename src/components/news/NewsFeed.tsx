
import { NewsArticle, NewsCard } from '@/components/news/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsFeedProps {
  articles: NewsArticle[];
  title: string;
  description?: string;
  isLoading?: boolean;
}

const NewsSkeletonCard = () => (
  <div className="space-y-3">
    <Skeleton className="h-[200px] w-full rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-full" />
    <div className="flex justify-between">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
);

export function NewsFeed({ articles, title, description, isLoading = false }: NewsFeedProps) {
  // Generate skeleton cards when loading
  const skeletonCards = Array(6).fill(0).map((_, i) => (
    <NewsSkeletonCard key={`skeleton-${i}`} />
  ));

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-3xl font-medium mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonCards}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No news articles found for this location.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsFeed;

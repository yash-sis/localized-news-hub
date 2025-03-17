
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockNewsArticles } from "@/data/mockNews";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsComments from "@/components/news/NewsComments";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  // Find the article based on slug
  const article = mockNewsArticles.find((article) => article.slug === slug);
  
  // Related articles (same category, excluding current)
  const relatedArticles = article
    ? mockNewsArticles
        .filter(
          (a) => a.category === article.category && a.id !== article.id
        )
        .slice(0, 3)
    : [];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article?.title,
          text: article?.summary,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this article with others.",
      });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Article not found</h1>
            <Button asChild variant="outline">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <>
      <Helmet>
        <title>{article.title} | LocalizeNews</title>
        <meta name="description" content={article.summary} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-20 pb-16">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="mb-2"
                  >
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-1" /> Back to news
                    </Link>
                  </Button>

                  <div className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {article.category}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-medium mb-4 text-balance">
                    {article.title}
                  </h1>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div>
                      <span>By {article.source}</span>
                      <span className="mx-2">•</span>
                      <span>{formattedDate}</span>
                      <span className="mx-2">•</span>
                      <span>{article.location}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                  </div>
                </div>

                <div className="mb-8">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full rounded-lg mb-6"
                  />
                  
                  {/* This would be the full article content - using summary for demo */}
                  <div className="prose prose-lg max-w-none">
                    <p className="lead">{article.summary}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                    </p>
                    <p>
                      Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
                    </p>
                    <p>
                      Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
                    </p>
                  </div>
                </div>

                {/* Comments section */}
                <NewsComments articleId={article.id} />
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-8">
                {/* Related articles */}
                <div className="rounded-lg border p-5">
                  <h3 className="text-lg font-medium mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relArticle) => (
                      <Link
                        key={relArticle.id}
                        to={`/news/${relArticle.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                              src={relArticle.imageUrl}
                              alt={relArticle.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">
                              {relArticle.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(relArticle.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ArticleDetail;

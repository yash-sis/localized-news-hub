
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Newspaper, Users, UserCheck } from "lucide-react";

// Define the sources data structure
interface NewsSource {
  id: string;
  name: string;
  type: 'newspaper' | 'journalist' | 'community';
  description: string;
  icon: React.ReactNode;
}

// Sample data for news sources
const sources: NewsSource[] = [
  {
    id: 'local-papers',
    name: 'Local Newspapers',
    type: 'newspaper',
    description: 'Content from trusted local newspapers and publications in your area',
    icon: <Newspaper className="h-8 w-8" />
  },
  {
    id: 'journalists',
    name: 'Independent Journalists',
    type: 'journalist',
    description: 'Stories from independent journalists and reporters covering your community',
    icon: <UserCheck className="h-8 w-8" />
  },
  {
    id: 'community',
    name: 'Community Contributors',
    type: 'community',
    description: 'News shared by verified community members about local events and issues',
    icon: <Users className="h-8 w-8" />
  }
];

export default function NewsSourcesSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium mb-2">Our News Sources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collect stories from multiple trusted sources to give you the most accurate
            and comprehensive coverage of your local area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {sources.map((source) => (
            <div 
              key={source.id}
              className="bg-card border border-border rounded-lg p-6 transition-all hover:shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                {source.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{source.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{source.description}</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to={`/sources/${source.id}`}>
                  View Sources
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link to="/contribute">
              Become a Contributor
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            We're always looking for local journalists and news sources to join our network
          </p>
        </div>
      </div>
    </section>
  );
}

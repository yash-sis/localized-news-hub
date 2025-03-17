
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Building2, Briefcase, Car, Cloud, Glasses, Utensils, Users } from 'lucide-react';

const categories = [
  { name: 'Local', icon: Building2, path: '/local' },
  { name: 'Business', icon: Briefcase, path: '/business' },
  { name: 'Transport', icon: Car, path: '/transport' },
  { name: 'Weather', icon: Cloud, path: '/weather' },
  { name: 'Culture', icon: Glasses, path: '/culture' },
  { name: 'Food', icon: Utensils, path: '/food' },
  { name: 'Community', icon: Users, path: '/community' }
];

export function NewsCategories() {
  return (
    <section className="py-10">
      <div className="container mb-6">
        <h2 className="section-title">Categories</h2>
        <p className="section-description">Explore news by category</p>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <Link key={category.name} to={category.path}>
                <Card className="h-full transition-all hover:shadow-md hover:border-border">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="rounded-full bg-secondary p-3 mb-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NewsCategories;

import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useStore } from '../lib/store';
import { categories } from '../lib/mockData';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';

export default function Index() {
  const products = useStore((state) => state.products);
  const featuredProducts = products.filter(product => product.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-16 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-200/50 to-amber-200/50 rounded-full mb-6 backdrop-blur-sm border border-pink-200/30">
            <Sparkles className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-pink-800 text-sm font-medium">New designs added weekly</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 bg-clip-text text-transparent leading-tight">
            Cool & Cute
            <br />
            <span className="text-4xl md:text-6xl">Printable Designs</span>
          </h1>
          
          <p className="text-xl text-pink-700/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our collection of beautifully crafted printables designed to add charm and personality to your projects. From planners to party decorations, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="!bg-transparent !hover:bg-transparent border-pink-400 text-pink-700 hover:border-pink-500 backdrop-blur-sm"
            >
              View Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-800 mb-4">Browse Categories</h2>
          <p className="text-pink-600/70 text-lg">Find exactly what you're looking for</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/40 backdrop-blur-sm border-pink-200/50 hover:border-pink-300/50 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-pink-800 text-sm leading-tight group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-pink-800 mb-2">Featured Designs</h2>
            <p className="text-pink-600/70">Our most popular and newest creations</p>
          </div>
          <Button variant="outline" asChild className="!bg-transparent !hover:bg-transparent border-pink-400 text-pink-700">
            <Link to="/products">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-800 mb-4">Why Choose Chalk&Canva?</h2>
          <p className="text-pink-600/70 text-lg">Quality designs that make a difference</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎨',
              title: 'Original Designs',
              description: 'Every printable is uniquely crafted by our talented design team'
            },
            {
              icon: '⚡',
              title: 'Instant Download',
              description: 'Get your files immediately after purchase, ready to print'
            },
            {
              icon: '💝',
              title: 'High Quality',
              description: 'Premium resolution files that look amazing when printed'
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center bg-white/40 backdrop-blur-sm border-pink-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-pink-800 mb-3">{feature.title}</h3>
                <p className="text-pink-600/70 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useStore } from '../lib/store';
import { categories } from '../lib/mockData';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    getFilteredProducts
  } = useStore();

  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, selectedCategory, setSelectedCategory]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-pink-800 mb-2">Our Products</h1>
        <p className="text-pink-600/70 text-lg">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Browse our complete collection of printables'}
        </p>
      </div>

      {/* Filters and Controls */}
      <Card className="mb-8 bg-white/40 backdrop-blur-sm border-pink-200/50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter('')}
                className={selectedCategory === '' ? 'bg-pink-500 hover:bg-pink-600' : '!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700'}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.id)}
                  className={selectedCategory === category.id ? 'bg-pink-500 hover:bg-pink-600' : '!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700'}
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/50 border-pink-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-pink-200 rounded-md bg-white/50">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-100/50'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-100/50'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-pink-600/70">
          Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid/List */}
      {sortedProducts.length === 0 ? (
        <Card className="text-center py-16 bg-white/40 backdrop-blur-sm border-pink-200/50">
          <CardContent>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-pink-800 mb-2">No products found</h3>
            <p className="text-pink-600/70 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                handleCategoryFilter('');
                useStore.getState().setSearchQuery('');
              }}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
        }>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Product } from '../lib/mockData';
import { useStore } from '../lib/store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border-pink-200/50 hover:border-pink-300/50 hover:-translate-y-2">
      <Link to={`/product/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                Featured
              </Badge>
            )}
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 hover:bg-white"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-pink-900 mb-2 line-clamp-2 group-hover:text-pink-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-pink-600/70 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-pink-100/50 text-pink-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-pink-800">
          ₹{product.price}
        </span>
        <Button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
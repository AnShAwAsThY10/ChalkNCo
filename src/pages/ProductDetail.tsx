import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Download, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useStore } from '../lib/store';
import { categories } from '../lib/mockData';
import Layout from '../components/Layout';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === id);
  const category = categories.find(c => c.id === product?.category);
  const relatedProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-pink-800 mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-pink-600/70 mb-8">
        <Link to="/" className="hover:text-pink-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-pink-600">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-pink-600">
          {category?.name}
        </Link>
        <span>/</span>
        <span className="text-pink-800 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden bg-white/40 backdrop-blur-sm border-pink-200/50 cursor-pointer hover:border-pink-300 transition-colors">
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-20 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.featured && (
              <Badge className="mb-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                ⭐ Featured
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-pink-800 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-pink-800">${product.price}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-pink-600/70 text-sm">(24 reviews)</span>
            </div>
          </div>

          <Separator className="bg-pink-200/50" />

          <div>
            <h3 className="font-semibold text-pink-800 mb-3">Description</h3>
            <p className="text-pink-600/80 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-pink-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-pink-100/50 text-pink-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-pink-800 mb-3">What's Included</h3>
            <ul className="space-y-2 text-pink-600/80">
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4 text-green-600" />
                High-resolution PDF file
              </li>
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4 text-green-600" />
                Print-ready format (300 DPI)
              </li>
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4 text-green-600" />
                Instant download after purchase
              </li>
            </ul>
          </div>

          <Separator className="bg-pink-200/50" />

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="outline" className="w-full !bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
              <Link to="/products" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-pink-800 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300 bg-white/40 backdrop-blur-sm border-pink-200/50">
                <Link to={`/product/${relatedProduct.id}`}>
                  <CardContent className="p-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-32 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="font-semibold text-pink-800 text-sm mb-2">{relatedProduct.name}</h3>
                    <span className="text-lg font-bold text-pink-800">${relatedProduct.price}</span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
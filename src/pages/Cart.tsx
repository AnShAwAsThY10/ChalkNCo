import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useStore } from '../lib/store';
import { useAuth } from '../lib/auth';
import Layout from '../components/Layout';
import { toast } from 'sonner';

export default function Cart() {
  const { username } = useAuth();
  const { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const cart = getCart(username || '');

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity, username || '');
    if (newQuantity === 0) {
      toast.success('Item removed from cart');
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId, username || '');
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart(username || '');
    toast.success('Cart cleared');
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="text-center py-16">
          <Card className="max-w-md mx-auto bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-12">
              <ShoppingBag className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-pink-800 mb-4">Your cart is empty</h2>
              <p className="text-pink-600/70 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                <Link to="/products">
                  Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-pink-800">Shopping Cart</h1>
          <Button 
            variant="outline" 
            onClick={handleClearCart}
            className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-pink-800 mb-1">
                            <Link to={`/product/${item.id}`} className="hover:text-pink-600">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-pink-600/70 text-sm line-clamp-2">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-pink-600 hover:text-pink-800 hover:bg-pink-100/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 !bg-transparent !hover:bg-transparent border-pink-300"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium text-pink-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 !bg-transparent !hover:bg-transparent border-pink-300"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-pink-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-pink-600/70">
                            ${item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-white/40 backdrop-blur-sm border-pink-200/50">
              <CardHeader>
                <CardTitle className="text-pink-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-pink-700">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${getCartTotal(username || '').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-pink-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-pink-700">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                </div>
                
                <Separator className="bg-pink-200/50" />
                
                <div className="flex justify-between text-lg font-bold text-pink-800">
                  <span>Total</span>
                  <span>${getCartTotal(username || '').toFixed(2)}</span>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full !bg-transparent !hover:bg-transparent border-pink-300 text-pink-700"
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
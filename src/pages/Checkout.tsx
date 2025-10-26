import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useStore } from '../lib/store';
import { useAuth } from '../lib/auth';
import Layout from '../components/Layout';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { username } = useAuth();
  const { getCart, getCartTotal, clearCart, addOrder } = useStore();
  const cart = getCart(username || '');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: cart,
      total: getCartTotal(username || ''),
      status: 'processing' as const
    };

    addOrder(newOrder, username || '');
    clearCart(username || '');
    
    toast.success('Order placed successfully!');
    navigate('/orders');
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="text-center py-16">
          <Card className="max-w-md mx-auto bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-12">
              <h2 className="text-2xl font-bold text-pink-800 mb-4">No items to checkout</h2>
              <p className="text-pink-600/70 mb-6">Add some items to your cart first.</p>
              <Button asChild className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                <a href="/products">Start Shopping</a>
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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/cart')} className="text-pink-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-4xl font-bold text-pink-800">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-pink-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-pink-700">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-pink-700">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-pink-700">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-pink-700">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-pink-700">State</Label>
                      <Select onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="bg-white/50 border-pink-200">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-pink-700">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                    <Lock className="w-4 h-4 ml-2 text-green-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="text-pink-700">Name on Card</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      required
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-pink-700">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      required
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-pink-700">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-pink-700">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        required
                        className="bg-white/50 border-pink-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-pink-800">{item.name}</div>
                          <div className="text-pink-600/70">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-medium text-pink-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="bg-pink-200/50" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-pink-700">
                      <span>Subtotal</span>
                      <span>${getCartTotal(username || '').toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-pink-700">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
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
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
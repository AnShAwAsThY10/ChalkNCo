import { ArrowLeft, Package, User, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useStore } from '../lib/store';
import { useCurrency } from '../lib/currency';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { userOrders } = useStore();
  const { formatPrice } = useCurrency();
  
  // Get all orders from all users
  const getAllOrders = () => {
    const allOrders = Object.entries(userOrders).flatMap(([username, orders]) =>
      orders.map(order => ({ ...order, username }))
    );
    return allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const allOrders = getAllOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '🔄';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin')} className="text-pink-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <h1 className="text-4xl font-bold text-pink-800">Order Management</h1>
        </div>

        {/* Order Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-pink-800">{allOrders.length}</p>
                </div>
                <div className="text-3xl">🛒</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-pink-800">
                    {formatPrice(allOrders.reduce((sum, order) => sum + order.total, 0))}
                  </p>
                </div>
                <div className="text-3xl">💰</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Processing</p>
                  <p className="text-2xl font-bold text-pink-800">
                    {allOrders.filter(order => order.status === 'processing').length}
                  </p>
                </div>
                <div className="text-3xl">🔄</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Delivered</p>
                  <p className="text-2xl font-bold text-pink-800">
                    {allOrders.filter(order => order.status === 'delivered').length}
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {allOrders.length === 0 ? (
            <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-pink-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-pink-800 mb-4">No orders yet</h2>
                <p className="text-pink-600/70">Orders will appear here when customers place them.</p>
              </CardContent>
            </Card>
          ) : (
            allOrders.map((order) => (
              <Card key={order.id} className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-pink-800">Order #{order.id}</CardTitle>
                        <p className="text-pink-600/70 text-sm">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)} {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-800">{formatPrice(order.total)}</p>
                      <p className="text-pink-600/70 text-sm">Total Amount</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Information */}
                    <div>
                      <h3 className="font-semibold text-pink-800 mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-pink-600" />
                          <span className="text-pink-700">Username:</span>
                          <span className="font-medium">{order.username}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-pink-600" />
                          <span className="text-pink-700">Email:</span>
                          <span className="font-medium">{order.email || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-pink-600" />
                          <span className="text-pink-700">Phone:</span>
                          <span className="font-medium">{order.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-pink-600" />
                          <span className="text-pink-700">Address:</span>
                          <span className="font-medium">{order.address || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-semibold text-pink-800 mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Order Summary
                      </h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white/30 rounded">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-pink-800">{item.name}</p>
                                <p className="text-sm text-pink-600/70">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium text-pink-800">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-pink-800">Total:</span>
                        <span className="text-xl font-bold text-pink-800">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

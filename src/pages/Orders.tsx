import { useState } from 'react';
import { Package, Eye, Download, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useStore } from '../lib/store';
import { useAuth } from '../lib/auth';
import { Order } from '../lib/mockData';
import Layout from '../components/Layout';

export default function Orders() {
  const { username } = useAuth();
  const { getOrders } = useStore();
  const orders = getOrders(username || '');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order['status']) => {
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

  const getStatusIcon = (status: Order['status']) => {
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

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="text-center py-16">
          <Card className="max-w-md mx-auto bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-12">
              <Package className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-pink-800 mb-4">No orders yet</h2>
              <p className="text-pink-600/70 mb-6">
                When you place your first order, it will appear here.
              </p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-pink-800">My Orders</h1>
          <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-white/40 backdrop-blur-sm border-pink-200/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-pink-800">Order {order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-800">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-pink-600/70">{order.date}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-pink-800 text-sm truncate">{item.name}</div>
                          <div className="text-pink-600/70 text-xs">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center text-pink-600/70 text-sm">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>

                  <Separator className="bg-pink-200/50" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-pink-600/70">
                      <Package className="w-4 h-4" />
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-pink-200">
                          <DialogHeader>
                            <DialogTitle className="text-pink-800">Order Details - {selectedOrder?.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <Badge className={getStatusColor(selectedOrder.status)}>
                                  {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </Badge>
                                <div className="text-right">
                                  <div className="font-bold text-pink-800">${selectedOrder.total.toFixed(2)}</div>
                                  <div className="text-sm text-pink-600/70">{selectedOrder.date}</div>
                                </div>
                              </div>

                              <Separator className="bg-pink-200/50" />

                              <div>
                                <h4 className="font-semibold text-pink-800 mb-3">Items Ordered</h4>
                                <div className="space-y-3">
                                  {selectedOrder.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-3 bg-pink-50/50 rounded-lg">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                      />
                                      <div className="flex-1">
                                        <div className="font-medium text-pink-800">{item.name}</div>
                                        <div className="text-pink-600/70 text-sm">Quantity: {item.quantity}</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-pink-800">${(item.price * item.quantity).toFixed(2)}</div>
                                        <div className="text-sm text-pink-600/70">${item.price} each</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {order.status === 'delivered' && (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { useStore } from '../lib/store';
import { categories, Product } from '../lib/mockData';
import Layout from '../components/Layout';
import { toast } from 'sonner';

export default function Admin() {
  const { products } = useStore();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    featured: false,
    inStock: true
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: '/api/placeholder/400/400',
      tags: newProduct.tags.split(',').map(tag => tag.trim()),
      featured: newProduct.featured,
      inStock: newProduct.inStock
    };

    // In a real app, this would be sent to the backend
    toast.success('Product added successfully!');
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
      featured: false,
      inStock: true
    });
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    // In a real app, this would delete from the backend
    toast.success(`${productName} deleted successfully!`);
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
      featured: false,
      inStock: true
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-pink-800">Inventory Management</h1>
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-pink-200">
              <DialogHeader>
                <DialogTitle className="text-pink-800">Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-pink-700">Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-pink-700">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-pink-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-white/50 border-pink-200"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-pink-700">Category *</Label>
                  <Select onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-white/50 border-pink-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-pink-700">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newProduct.tags}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="cute, printable, planner"
                    className="bg-white/50 border-pink-200"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={newProduct.featured}
                      onCheckedChange={(checked) => setNewProduct(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label htmlFor="featured" className="text-pink-700">Featured Product</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="inStock"
                      checked={newProduct.inStock}
                      onCheckedChange={(checked) => setNewProduct(prev => ({ ...prev, inStock: checked }))}
                    />
                    <Label htmlFor="inStock" className="text-pink-700">In Stock</Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddProduct} className="flex-1 bg-pink-500 hover:bg-pink-600">
                    <Save className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                  <Button variant="outline" onClick={resetForm} className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                    Reset
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Total Products</p>
                  <p className="text-2xl font-bold text-pink-800">{products.length}</p>
                </div>
                <div className="text-3xl">📦</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Featured</p>
                  <p className="text-2xl font-bold text-pink-800">{products.filter(p => p.featured).length}</p>
                </div>
                <div className="text-3xl">⭐</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">In Stock</p>
                  <p className="text-2xl font-bold text-pink-800">{products.filter(p => p.inStock).length}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600/70 text-sm">Categories</p>
                  <p className="text-2xl font-bold text-pink-800">{categories.length}</p>
                </div>
                <div className="text-3xl">🏷️</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
          <CardHeader>
            <CardTitle className="text-pink-800">Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 bg-white/30 rounded-lg border border-pink-200/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-pink-800">{product.name}</h3>
                      {product.featured && (
                        <Badge className="bg-amber-100 text-amber-800">Featured</Badge>
                      )}
                      <Badge className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <p className="text-pink-600/70 text-sm line-clamp-1">{product.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="font-bold text-pink-800">${product.price}</span>
                      <span className="text-pink-600/70 text-sm">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="!bg-transparent !hover:bg-transparent border-red-300 text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
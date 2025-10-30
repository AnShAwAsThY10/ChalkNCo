import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Settings, Package, Home, User, Shield, LogOut, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useStore } from '../lib/store';
import { useAuth } from '../lib/auth';
import SearchBar from './SearchBar';
import { toast } from 'sonner';


var img = '../images/PHOTO-2025-10-27-17-38-42.jpg';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { isAuthenticated, isAdmin, username, logout } = useAuth();
  const cartUser = username || 'guest';
  const cartItemsCount = useStore((state) => state.getCartItemsCount(cartUser));

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">

                <img
                  src={require('../images/PHOTO-2025-10-27-17-38-42.png')}
                  alt="C&C"
                  className="w-12 h-12 rounded-full shadow-md object-cover border-2 border-pink-300 scale-130"                />
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">
                  Chalk&Canva
                </h1>
                <p className="text-xs text-pink-600/70">Custom Designed Printables</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className="bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              
              <Button
                variant={isActive('/products') ? 'default' : 'ghost'}
                size="sm"
                asChild
                className="bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
              >
                <Link to="/products">
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </Link>
              </Button>

              {isAuthenticated && (
                <>
                  <Button
                    variant={isActive('/orders') ? 'default' : 'ghost'}
                    size="sm"
                    asChild
                    className="bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
                  >
                    <Link to="/orders">
                      <User className="w-4 h-4 mr-2" />
                      Orders
                    </Link>
                  </Button>

                  <Button
                    variant={isActive('/cart') ? 'default' : 'ghost'}
                    size="sm"
                    asChild
                    className="relative bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
                  >
                    <Link to="/cart">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                      {cartItemsCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs">
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  {isAdmin && (
                    <Button
                      variant={isActive('/admin') ? 'default' : 'ghost'}
                      size="sm"
                      asChild
                      className="bg-amber-100/50 hover:bg-amber-200/50 text-amber-700"
                      title="Admin Panel"
                    >
                      <Link to="/admin">
                        <Shield className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}

                  <Button
                    variant={isActive('/settings') ? 'default' : 'ghost'}
                    size="sm"
                    asChild
                    className="bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
                  >
                    <Link to="/settings">
                      <Settings className="w-4 h-4" />
                    </Link>
                  </Button>

                  <div className="flex items-center gap-2 px-3 py-1 bg-pink-100/50 rounded-md">
                    <span className="text-sm text-pink-700">
                      {isAdmin ? '👑 Admin' : `👤 ${username}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="h-6 w-6 p-0 text-pink-600 hover:text-pink-800"
                    >
                      <LogOut className="w-3 h-3" />
                    </Button>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <Button
                  variant={isActive('/login') ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                  className="bg-pink-100/50 hover:bg-pink-200/50 text-pink-700"
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
            </nav>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 backdrop-blur-md bg-white/30 border-t border-pink-200/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">C&C</span>
            </div>
            <span className="text-pink-700 font-medium">Chalk and Canva by Shreya</span>
          </div>
          <p className="text-pink-600/70 text-sm">
            Discover cool and cute custom designed printables for all your creative needs
          </p>
        </div>
      </footer>
    </div>
  );
}
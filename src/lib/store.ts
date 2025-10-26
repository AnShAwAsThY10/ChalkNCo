import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order, mockProducts, mockOrders } from './mockData';

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addOrder: (order: Order) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getFilteredProducts: () => Product[];
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      cart: [],
      orders: mockOrders,
      searchQuery: '',
      selectedCategory: '',

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }]
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      addOrder: (order) => {
        set({
          orders: [order, ...get().orders]
        });
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory } = get();
        
        return products.filter(product => {
          const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
          
          return matchesSearch && matchesCategory && product.inStock;
        });
      },
    }),
    {
      name: 'chalk-canva-store',
      partialize: (state) => ({ cart: state.cart, orders: state.orders }),
    }
  )
);
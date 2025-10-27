import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order, mockProducts, mockOrders } from './mockData';

interface UserCart {
  [username: string]: CartItem[];
}

interface UserOrders {
  [username: string]: Order[];
}

interface StoreState {
  products: Product[];
  userCarts: UserCart;
  userOrders: UserOrders;
  searchQuery: string;
  selectedCategory: string;
  
  // Cart Actions
  addToCart: (product: Product, username: string) => void;
  removeFromCart: (productId: string, username: string) => void;
  updateQuantity: (productId: string, quantity: number, username: string) => void;
  clearCart: (username: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addOrder: (order: Order, username: string) => void;
  getCartTotal: (username: string) => number;
  getCartItemsCount: (username: string) => number;
  getFilteredProducts: () => Product[];
  getCart: (username: string) => CartItem[];
  getOrders: (username: string) => Order[];
  
  // Product Management Actions
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      userCarts: {},
      userOrders: {},
      searchQuery: '',
      selectedCategory: '',

      addToCart: (product, username) => {
        const { userCarts } = get();
        const cart = userCarts[username] || [];
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            userCarts: {
              ...userCarts,
              [username]: cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          });
        } else {
          set({
            userCarts: {
              ...userCarts,
              [username]: [...cart, { ...product, quantity: 1 }]
            }
          });
        }
      },

      removeFromCart: (productId, username) => {
        const { userCarts } = get();
        const cart = userCarts[username] || [];
        set({
          userCarts: {
            ...userCarts,
            [username]: cart.filter(item => item.id !== productId)
          }
        });
      },

      updateQuantity: (productId, quantity, username) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, username);
          return;
        }
        
        const { userCarts } = get();
        const cart = userCarts[username] || [];
        set({
          userCarts: {
            ...userCarts,
            [username]: cart.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
          }
        });
      },

      clearCart: (username) => {
        const { userCarts } = get();
        set({ 
          userCarts: {
            ...userCarts,
            [username]: []
          }
        });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      addOrder: (order, username) => {
        const { userOrders } = get();
        const orders = userOrders[username] || [];
        set({
          userOrders: {
            ...userOrders,
            [username]: [order, ...orders]
          }
        });
      },

      getCartTotal: (username) => {
        const { userCarts } = get();
        const cart = userCarts[username] || [];
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartItemsCount: (username) => {
        const { userCarts } = get();
        const cart = userCarts[username] || [];
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      getCart: (username) => {
        const { userCarts } = get();
        return userCarts[username] || [];
      },

      getOrders: (username) => {
        const { userOrders } = get();
        return userOrders[username] || [];
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

      // Product Management Functions
      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product]
        }));
      },

      updateProduct: (productId, updatedProduct) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === productId ? { ...product, ...updatedProduct } : product
          )
        }));
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== productId)
        }));
      },
    }),
    {
      name: 'chalk-canva-store',
      partialize: (state) => ({ userCarts: state.userCarts, userOrders: state.userOrders }),
    }
  )
);
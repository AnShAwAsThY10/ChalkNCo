import { href } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
}

export const categories = [
  { id: 'planners', name: 'Planners & Organizers', icon: '📅' },
  { id: 'stickers', name: 'Stickers & Labels', icon: '🏷️' },
  { id: 'cards', name: 'Greeting Cards', icon: '💌' },
  { id: 'wall-art', name: 'Wall Art Prints', icon: '🖼️' },
  { id: 'party', name: 'Party Printables', icon: '🎉' },
  { id: 'educational', name: 'Educational Materials', icon: '📚' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pastel Dream Weekly Planner',
    description: 'Beautiful weekly planner with soft pastel colors and gold accents. Perfect for organizing your week in style.',
    price: 999,
    category: 'planners',
    image: 'data:image/jpeg;base64,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',
    tags: ['planner', 'weekly', 'pastel', 'organization'],
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Golden Butterfly Sticker Set',
    description: 'Elegant butterfly stickers with golden foil effect. Set of 24 premium stickers.',
    price: 699,
    category: 'stickers',
    image: '/api/placeholder/400/400',
    tags: ['stickers', 'butterfly', 'golden', 'decorative'],
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Pink Floral Birthday Card',
    description: 'Cute birthday card with pink floral design. Includes matching envelope template.',
    price: 399,
    category: 'cards',
    image: '/api/placeholder/400/400',
    tags: ['birthday', 'card', 'floral', 'pink'],
    featured: false,
    inStock: true,
  },
  {
    id: '4',
    name: 'Motivational Quote Wall Art',
    description: 'Inspiring wall art print with beautiful typography and soft color palette.',
    price: 1299,
    category: 'wall-art',
    image: '/api/placeholder/400/400',
    tags: ['wall art', 'motivational', 'typography', 'decor'],
    featured: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'Baby Shower Party Kit',
    description: 'Complete party printable kit with invitations, decorations, and games.',
    price: 1999,
    category: 'party',
    image: '/api/placeholder/400/400',
    tags: ['baby shower', 'party', 'kit', 'decorations'],
    featured: false,
    inStock: true,
  },
  {
    id: '6',
    name: 'Alphabet Learning Cards',
    description: 'Educational alphabet cards with cute illustrations for early learning.',
    price: 799,
    category: 'educational',
    image: '/api/placeholder/400/400',
    tags: ['educational', 'alphabet', 'learning', 'kids'],
    featured: false,
    inStock: true,
  },
];

export const mockOrders: Order[] = [
  // {
  //   id: 'ORD-001',
  //   date: '2024-01-15',
  //   items: [
  //     { ...mockProducts[0], quantity: 1 },
  //     { ...mockProducts[1], quantity: 2 },
  //   ],
  //   total: 2397,
  //   status: 'delivered',
  // },
  // {
  //   id: 'ORD-002',
  //   date: '2024-01-20',
  //   items: [
  //     { ...mockProducts[3], quantity: 1 },
  //   ],
  //   total: 1299,
  //   status: 'shipped',
  // },
];
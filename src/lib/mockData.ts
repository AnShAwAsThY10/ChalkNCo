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
    image: '/api/placeholder/400/400',
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
  {
    id: 'ORD-001',
    date: '2024-01-15',
    items: [
      { ...mockProducts[0], quantity: 1 },
      { ...mockProducts[1], quantity: 2 },
    ],
    total: 2397,
    status: 'delivered',
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    items: [
      { ...mockProducts[3], quantity: 1 },
    ],
    total: 1299,
    status: 'shipped',
  },
];
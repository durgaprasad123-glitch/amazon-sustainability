export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  category: string;
  description: string;
  tags: string[];
  isGreen: boolean;
  weight: number;
  dimensions: string;
  aiConfidence?: number;
  organicPercentage?: number;
  inorganicPercentage?: number;
  features: string[];
  brand: string;
  inStock: boolean;
  fastDelivery: boolean;
  image: string; // For cart compatibility
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton T-Shirt - Eco Friendly',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviews: 1247,
    imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    description: '100% organic cotton t-shirt made from sustainable materials. Soft, comfortable, and environmentally friendly.',
    tags: ['organic', 'eco-friendly', 'cotton', 'sustainable'],
    isGreen: true,
    weight: 0.2,
    dimensions: '30x20x2 cm',
    aiConfidence: 95,
    organicPercentage: 100,
    inorganicPercentage: 0,
    features: ['100% Organic Cotton', 'Fair Trade Certified', 'Biodegradable Packaging', 'Hypoallergenic'],
    brand: 'EcoWear',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '2',
    name: 'Bamboo Fiber Yoga Mat - Natural',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 892,
    imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sports',
    description: 'Premium yoga mat made from sustainable bamboo fiber. Non-slip surface with natural antimicrobial properties.',
    tags: ['bamboo', 'eco-friendly', 'yoga', 'sustainable', 'natural'],
    isGreen: true,
    weight: 1.2,
    dimensions: '180x60x0.6 cm',
    aiConfidence: 92,
    organicPercentage: 85,
    inorganicPercentage: 15,
    features: ['100% Bamboo Fiber', 'Non-slip Surface', 'Antimicrobial', 'Biodegradable'],
    brand: 'ZenBamboo',
    inStock: true,
    fastDelivery: false
  },
  {
    id: '3',
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.3,
    reviews: 2341,
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    tags: ['wireless', 'bluetooth', 'electronics'],
    isGreen: false,
    weight: 0.3,
    dimensions: '20x18x8 cm',
    features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Voice Assistant'],
    brand: 'SoundTech',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '4',
    name: 'Recycled Paper Notebook Set',
    price: 18.99,
    rating: 4.6,
    reviews: 567,
    imageUrl: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Stationery',
    description: 'Set of 3 notebooks made from 100% recycled paper. Perfect for journaling, note-taking, and sketching.',
    tags: ['recycled', 'paper', 'eco-friendly', 'sustainable'],
    isGreen: true,
    weight: 0.5,
    dimensions: '21x15x2 cm',
    aiConfidence: 88,
    organicPercentage: 70,
    inorganicPercentage: 30,
    features: ['100% Recycled Paper', 'Acid-free', 'Soy-based Ink', 'FSC Certified'],
    brand: 'EcoWrite',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    price: 32.99,
    rating: 4.4,
    reviews: 1456,
    imageUrl: 'https://images.pexels.com/photos/2090641/pexels-photo-2090641.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/2090641/pexels-photo-2090641.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Kitchen',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
    tags: ['stainless steel', 'insulated', 'reusable'],
    isGreen: false,
    weight: 0.4,
    dimensions: '25x7x7 cm',
    features: ['Double-wall Insulation', 'Leak-proof', 'BPA-free', '500ml Capacity'],
    brand: 'HydroSteel',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '6',
    name: 'Organic Coconut Oil - Cold Pressed',
    price: 16.99,
    rating: 4.8,
    reviews: 934,
    imageUrl: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Health',
    description: 'Premium organic coconut oil, cold-pressed and unrefined. Perfect for cooking and skincare.',
    tags: ['organic', 'coconut oil', 'cold-pressed', 'natural'],
    isGreen: true,
    weight: 0.5,
    dimensions: '12x8x8 cm',
    aiConfidence: 97,
    organicPercentage: 100,
    inorganicPercentage: 0,
    features: ['100% Organic', 'Cold-pressed', 'Unrefined', 'Multi-purpose'],
    brand: 'PureNature',
    inStock: true,
    fastDelivery: false
  },
  {
    id: '7',
    name: 'Gaming Mechanical Keyboard',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.2,
    reviews: 678,
    imageUrl: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'RGB backlit mechanical gaming keyboard with tactile switches and programmable keys.',
    tags: ['gaming', 'mechanical', 'keyboard', 'rgb'],
    isGreen: false,
    weight: 1.1,
    dimensions: '44x13x4 cm',
    features: ['Mechanical Switches', 'RGB Backlighting', 'Programmable Keys', 'Anti-ghosting'],
    brand: 'GameTech',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '8',
    name: 'Biodegradable Phone Case',
    price: 22.99,
    rating: 4.5,
    reviews: 423,
    imageUrl: 'https://images.pexels.com/photos/4498485/pexels-photo-4498485.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/4498485/pexels-photo-4498485.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    description: 'Protective phone case made from biodegradable materials. Stylish and environmentally responsible.',
    tags: ['biodegradable', 'phone case', 'eco-friendly', 'sustainable'],
    isGreen: true,
    weight: 0.05,
    dimensions: '16x8x1 cm',
    aiConfidence: 93,
    organicPercentage: 80,
    inorganicPercentage: 20,
    features: ['Biodegradable Material', 'Drop Protection', 'Wireless Charging Compatible', 'Natural Finish'],
    brand: 'EcoCase',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '9',
    name: 'Organic Hemp Backpack',
    price: 67.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviews: 234,
    imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    description: 'Durable backpack made from 100% organic hemp fiber. Water-resistant and eco-friendly.',
    tags: ['organic', 'hemp', 'backpack', 'sustainable', 'eco-friendly'],
    isGreen: true,
    weight: 0.8,
    dimensions: '45x30x15 cm',
    aiConfidence: 96,
    organicPercentage: 95,
    inorganicPercentage: 5,
    features: ['100% Organic Hemp', 'Water-resistant', 'Multiple Compartments', 'Reinforced Straps'],
    brand: 'GreenPack',
    inStock: true,
    fastDelivery: true
  },
  {
    id: '10',
    name: 'Organic Cotton Bed Sheets',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 1567,
    imageUrl: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=500',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home',
    description: 'Luxurious bed sheet set made from 100% organic cotton. Breathable, soft, and hypoallergenic.',
    tags: ['organic', 'cotton', 'bedding', 'sustainable', 'hypoallergenic'],
    isGreen: true,
    weight: 1.5,
    dimensions: '200x150x30 cm',
    aiConfidence: 98,
    organicPercentage: 100,
    inorganicPercentage: 0,
    features: ['100% Organic Cotton', 'GOTS Certified', 'Hypoallergenic', 'Machine Washable'],
    brand: 'PureSleep',
    inStock: true,
    fastDelivery: false
  }
];

export const rewards = [
  {
    id: 'r1',
    name: 'Amazon Eco Sticker Pack',
    pointsRequired: 10,
    image: 'https://images.pexels.com/photos/5625121/pexels-photo-5625121.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Collection of 12 eco-themed stickers'
  },
  {
    id: 'r2',
    name: 'Bamboo Water Bottle',
    pointsRequired: 25,
    image: 'https://images.pexels.com/photos/2090641/pexels-photo-2090641.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Sustainable bamboo fiber water bottle'
  },
  {
    id: 'r3',
    name: '$10 Digital Coupon',
    pointsRequired: 50,
    image: 'https://images.pexels.com/photos/7887818/pexels-photo-7887818.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Digital coupon for green products'
  },
  {
    id: 'r4',
    name: 'Eco-friendly Tote Bag',
    pointsRequired: 30,
    image: 'https://images.pexels.com/photos/7262793/pexels-photo-7262793.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Reusable tote bag made from recycled materials'
  },
  {
    id: 'r5',
    name: 'Organic Seed Starter Kit',
    pointsRequired: 40,
    image: 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Grow your own herbs with this organic starter kit'
  },
  {
    id: 'r6',
    name: 'Solar Power Bank',
    pointsRequired: 75,
    image: 'https://images.pexels.com/photos/8891364/pexels-photo-8891364.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Portable solar-powered charging device'
  }
];
export type FragranceFamily = 'Floral' | 'Woody' | 'Fresh' | 'Oriental' | 'Spicy' | 'Musky';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: 'Perfume' | 'Attar';
  fragranceFamily: FragranceFamily;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  sizes: ProductSize[];
  reviews: Review[];
  dateAdded: string;
  popularity: number; // 0-100
}

export interface CartItem extends Omit<Product, 'sizes'> {
  quantity: number;
  selectedSize: string;
  selectedPrice: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Oud Al-Malaki',
    brand: 'Maki Signature',
    description: 'A majestic blend of pure Cambodian Oud, infused with Bulgarian rose and warm amber. Crafted in the heart of Lahore, this scent embodies royal elegance.',
    category: 'Perfume',
    fragranceFamily: 'Oriental',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Saffron', 'Cardamom'],
      middle: ['Bulgarian Rose', 'Jasmine'],
      base: ['Cambodian Oud', 'Amber', 'Sandalwood']
    },
    sizes: [
      { label: '50ml', price: 15000 },
      { label: '100ml', price: 25000 }
    ],
    reviews: [
      { id: 'r1', userName: 'Sarah J.', rating: 5, comment: 'Absolutely stunning. The oud is so smooth.', date: '2024-02-15' }
    ],
    dateAdded: '2023-10-01',
    popularity: 95
  },
  {
    id: '2',
    name: 'Lahore Bloom',
    brand: 'Maki Signature',
    description: 'Inspired by the gardens of Shalimar, this fragrance captures the essence of a blooming oasis at twilight. Delicate yet profound.',
    category: 'Perfume',
    fragranceFamily: 'Floral',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Bergamot', 'Pink Pepper'],
      middle: ['Damask Rose', 'Geranium'],
      base: ['White Musk', 'Vanilla']
    },
    sizes: [
      { label: '50ml', price: 10000 },
      { label: '100ml', price: 18000 }
    ],
    reviews: [],
    dateAdded: '2023-11-15',
    popularity: 88
  },
  {
    id: '3',
    name: 'Sultan\'s Amber',
    brand: 'Royal Collection',
    description: 'A concentrated oil (Attar) featuring the finest aged amber and spicy notes. A traditional favorite in Bhatti Chowk.',
    category: 'Attar',
    fragranceFamily: 'Spicy',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Cinnamon', 'Clove'],
      middle: ['Labdanum', 'Benzoin'],
      base: ['Ambergris', 'Patchouli']
    },
    sizes: [
      { label: '6ml', price: 4500 },
      { label: '12ml', price: 8500 }
    ],
    reviews: [
      { id: 'r2', userName: 'Ahmed K.', rating: 5, comment: 'Best amber attar I have ever used.', date: '2024-02-10' }
    ],
    dateAdded: '2023-08-20',
    popularity: 92
  },
  {
    id: '4',
    name: 'Midnight Jasmine',
    brand: 'Maki Signature',
    description: 'Capturing the intoxicating scent of jasmine flowers blooming under the moon in the old city of Lahore.',
    category: 'Perfume',
    fragranceFamily: 'Floral',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Neroli', 'Green Leaves'],
      middle: ['Night-blooming Jasmine', 'Tuberose'],
      base: ['Cedarwood', 'Musk']
    },
    sizes: [
      { label: '50ml', price: 9000 },
      { label: '100ml', price: 15000 }
    ],
    reviews: [],
    dateAdded: '2024-01-10',
    popularity: 75
  },
  {
    id: '5',
    name: 'White Musk Premium',
    brand: 'Royal Collection',
    description: 'The purest white musk attar. Clean, powdery, and long-lasting. A staple for every Pakistani fragrance lover.',
    category: 'Attar',
    fragranceFamily: 'Musky',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Lily of the Valley'],
      middle: ['White Flowers'],
      base: ['White Musk', 'Powdery Notes']
    },
    sizes: [
      { label: '6ml', price: 3000 },
      { label: '12ml', price: 5500 }
    ],
    reviews: [],
    dateAdded: '2023-09-05',
    popularity: 82
  },
  {
    id: '6',
    name: 'Indus Sandalwood',
    brand: 'Maki Signature',
    description: 'Creamy sandalwood blended with golden honey and spices, inspired by the rich heritage of the Indus Valley.',
    category: 'Perfume',
    fragranceFamily: 'Woody',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Honey', 'Black Pepper'],
      middle: ['Sandalwood', 'Orris'],
      base: ['Tonka Bean', 'Leather']
    },
    sizes: [
      { label: '50ml', price: 13000 },
      { label: '100ml', price: 22000 }
    ],
    reviews: [],
    dateAdded: '2023-12-20',
    popularity: 85
  }
];

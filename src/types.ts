export type NavigationTab = 
  | 'home' 
  | 'skincare' 
  | 'lunar-makeup' 
  | 'tidal-rituals' 
  | 'algae-science' 
  | 'about-us';

export interface Shade {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'skincare' | 'lunar-makeup' | 'tidal-rituals';
  tag?: string;
  tagColor?: string;
  price: number;
  volume: string;
  rating: number;
  reviewCount: number;
  description: string;
  extendedDescription: string;
  image: string;
  secondaryImage?: string;
  benefits: string[];
  keyActives: {
    name: string;
    origin: string;
    role: string;
  }[];
  usage: string;
  shades?: Shade[];
  batchInfo?: string;
  inDemand?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: Shade;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface DiagnosticResult {
  title: string;
  description: string;
  products: Product[];
  totalPrice: number;
  ritualSteps: string[];
}

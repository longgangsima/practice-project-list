// Restaurant System Types
export interface Order {
  id: string;
  customer: string;
  spice: string;
  base: string;
  protein: string;
  dressings: string[];
  quantity: number;
  pickupDate: string;
  comments: string;
  address: string;
}

export interface OrderCardProps {
  order: Order;
}

// Spice levels
export type SpiceLevel = 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';

// Base options
export type BaseOption = 'Salad Bowl' | 'Grain Bowl' | 'Noodle Bowl' | 'Rice Bowl';

// Protein options
export type ProteinOption = 'Grilled Chicken' | 'Tofu' | 'Steak' | 'Salmon' | 'Veggie Patty';

// Dressing options
export type DressingOption = 
  | 'Balsamic Vinaigrette' 
  | 'Ranch' 
  | 'Caesar' 
  | 'Italian' 
  | 'Honey Mustard' 
  | 'Thai Peanut';

// Order status for future use
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

// Extended order interface with status (for future features)
export interface OrderWithStatus extends Order {
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Common UI Types
export interface ProjectLayoutProps {
  currentPath: string;
  children: React.ReactNode;
}

// Generic API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: number;
  details?: any;
}

// Book Store Types (if needed for other parts of the app)
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  genre: string;
  price: number;
  availability: boolean;
}

export interface Author {
  id: string;
  name: string;
  biography?: string;
  books: string[]; // Array of book IDs
}

// Image Carousel Types
export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
}

// Trading Chart Types (placeholder for future use)
export interface TradingData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Navigation Types
export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

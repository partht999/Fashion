export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional property for products with discounts
  image: string;
  category: string;
} 
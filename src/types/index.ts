export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: "USD" | "CUP" | "MLC";
  category: ProductCategory;
  images: string[];
  specs: ProductSpec[];
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductCategory = 
  | "powerbanks"
  | "ecoflow"
  | "solar_panels"
  | "accessories";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "in_delivery"
  | "delivered"
  | "cancelled";

export interface Conversation {
  id: string;
  user_id: string;
  admin_id: string | null;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
  messages?: Message[];
  user?: {
    id: string;
    email: string;
    name: string;
  };
  last_message?: Message;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: "user" | "admin";
  content: string;
  created_at: string;
  read_at: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
  created_at: string;
}
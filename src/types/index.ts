export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: "USD" | "CUP" | "MLC";
  category: ProductCategory;
  images: string[] | null;
  specs: ProductSpec[] | null;
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

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product_name?: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes: string | null;
  shipping_address: string | null;
  payment_method: string | null;
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

export interface ConversationWithMessages extends Conversation {
  messages?: Message[];
  user?: {
    id: string;
    email: string;
    name: string;
  };
  last_message?: Message;
  unread_count?: number;
}
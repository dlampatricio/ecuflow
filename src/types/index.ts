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
  category: ProductCategory;
  images: string[] | null;
  specs: ProductSpec[] | null;
  featured: boolean;
  owner_id: string | null;
  owner?: User;
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
export interface Conversation {
  id: string;
  user_id: string;
  admin_id: string | null;
  product_id: string | null;
  chat_type: "product_owner" | "sales";
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
  product?: Product;
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
import { create } from "zustand";
import { createClient } from "@/lib/supabase-server";
import type { Order, OrderStatus } from "@/types";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: (userId: string) => Promise<void>;
  createOrder: (order: Omit<Order, "id" | "created_at" | "updated_at">) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      set({ orders: data as Order[], loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createOrder: async (order) => {
    set({ loading: true, error: null });
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();

      if (error) throw error;
      set({ orders: [...get().orders, data as Order], loading: false });
      return data as Order;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    set({ loading: true, error: null });
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;
      set({
        orders: get().orders.map((o) =>
          o.id === orderId ? { ...o, status } : o
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
"use server";

import { createClient } from "@supabase/supabase-js";
import type { CartItem } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendMessage(conversationId: string, content: string, senderType: "user" | "admin") {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderType === "user" ? "user-clerk-id" : "admin-clerk-id",
      sender_type: senderType,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createConversation(userId: string) {
  const { data: existing } = await supabase
    .from("conversations")
    .select()
    .eq("user_id", userId)
    .eq("status", "open")
    .single();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function markMessagesAsRead(messageIds: string[]) {
  const { error } = await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .in("id", messageIds);

  if (error) throw error;
}

export async function createOrder(items: CartItem[], total: number, notes: string) {
  const serializedItems = items.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
    product_name: item.product.name,
  }));

  const { data, error } = await supabase
    .from("orders")
    .insert({
      items: serializedItems,
      total,
      notes,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
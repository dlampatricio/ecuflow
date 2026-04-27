"use server";

import { createClient } from "@/lib/supabase-server";
import type { CartItem } from "@/types";

export async function sendMessage(conversationId: string, content: string, senderType: "user" | "admin") {
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function markMessagesAsRead(messageIds: string[]) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("messages")
    .update({ read_at: new Date().toISOString() })
    .in("id", messageIds);

  if (error) throw error;
}

export async function createOrder(items: CartItem[], total: number, notes: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("orders")
    .insert({
      items,
      total,
      notes,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
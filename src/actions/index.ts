"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendMessage(
  conversationId: string, 
  content: string, 
  senderType: "user" | "admin",
  senderId: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      sender_type: senderType,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createConversation(
  userId: string, 
  chatType: "product_owner" | "sales" = "sales",
  productId?: string
) {
  const { data: existing } = await supabase
    .from("conversations")
    .select()
    .eq("user_id", userId)
    .eq("chat_type", chatType)
    .eq("status", "open")
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("conversations")
    .insert({ 
      user_id: userId, 
      chat_type: chatType,
      product_id: productId || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getOrCreateConversation(
  userId: string,
  chatType: "product_owner" | "sales",
  productId?: string
) {
  let conversation;

  if (productId) {
    const { data: existing } = await supabase
      .from("conversations")
      .select()
      .eq("user_id", userId)
      .eq("product_id", productId)
      .eq("chat_type", chatType)
      .eq("status", "open")
      .maybeSingle();

    conversation = existing;
  } else {
    const { data: existing } = await supabase
      .from("conversations")
      .select()
      .eq("user_id", userId)
      .eq("chat_type", chatType)
      .eq("status", "open")
      .maybeSingle();

    conversation = existing;
  }

  if (conversation) return conversation;

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: userId,
      chat_type: chatType,
      product_id: productId || null,
    })
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

export async function getConversationsByUser(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      product:products(id, name, slug, images)
    `)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserByClerkId(clerkId: string) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("clerk_id", clerkId)
    .single();

  if (error) throw error;
  return data;
}